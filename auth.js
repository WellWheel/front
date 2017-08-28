var jwt = require('express-jwt');
var jsonWebToken = require('jsonwebtoken');
var fs = require('fs');

module.exports = {
      
      init : function () {

          var publicKey = fs.readFileSync('public.pem');
          return jwt({
            secret: publicKey,
            credentialsRequired: false,
            requestProperty: 'auth',
            getToken: function fromCookie (req) {
              console.log("token is " +  req.cookies.my_token);
              if (typeof req.cookies.my_token !== 'undefined') {
                  return req.cookies.my_token;
              }
              return null;
            }
        });
    },
    /*isAuthenticated: function (req, res, next) {
      console.log("req.auth : " + req.auth)
      if(req.auth) {
        return next();
      }

      res.statusCode = 302;
      res.setHeader("Location", '/');
      res.end();
    },*/
    isAuthenticated: function (req, res, next) {
      console.log("req.auth : " + req.auth)
      if(req.auth) {
          var publicKey = fs.readFileSync('public.pem');
          jsonWebToken.verify(req.cookies.my_token, publicKey, function(err, decoded) {
            if (err) { // it should 
                console.log('Err : ' + err)
                if (err.name == 'Error' && err.message == 'jwt expired') { // paranoid mode
                    // if decoded payloads needed : old_payloads = jwt.decode(token);
                    // now you can check user, permissions, .... and serve a new token 
                    // new_token = jwt.sign({ iss: old_payloads.iss}, 'secret', {expiresInMinutes: 60});
                    // res.json({token:new_token});

                    console.log('Error jwt expired');
                    res.clearCookie('my_token');
                    
                    res.statusCode = 302;
                    res.setHeader("Location", '/');
                    res.end();
                }
                else {
                  console.log('No token error with jwt expired')
                  return next();
                }
            } else {
                  console.log('No token error')
                return next();
            }


            res.statusCode = 302;
            res.setHeader("Location", '/');
            res.end();
          });
      } else {
        res.statusCode = 302;
        res.setHeader("Location", '/');
        res.end();
      }
    },
    isSpotifyAuthenticated: function (req, res , next) {
      if (typeof req.cookies.spotify_token !== 'undefined') {
        if (req.cookies.spotify_token) {
          return next();
        }
      }

      res.redirect('/spotify/');
    }
};

