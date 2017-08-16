var jwt = require('express-jwt');
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
              if (req.cookies.my_token) {
                  return req.cookies.my_token;
              }
              return null;
            }
        });
    },
    isAuthenticated: function (req, res, next) {
      console.log("req.auth : " + req.auth)
      if(req.auth) {
        return next();
      }

      res.statusCode = 302;
      res.setHeader("Location", '/');
      res.end();
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

