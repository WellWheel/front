var jwt = require('express-jwt');
var jsonWebToken = require('jsonwebtoken');
var fs = require('fs');

var auth = {

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
    isAuthenticated: function (req, res, next) {
      console.log("req.auth : " + req.auth)
      if(req.auth) {
          res.locals.login = true;

            return next();
      } else {
        console.log("REDIRIGEEEEEE")
        res.statusCode = 302;
        res.setHeader("Location", '/');
        res.end();
      }


    },
    isSpotifyAuthenticated: function (req, res , next) {
        if (auth.checkSpotifyAuthenticated(req, res)) {
          return next();
        }

        res.redirect('/parameters/');
    },
    checkSpotifyAuthenticated: function (req, res, next) {
      if (typeof req.cookies.spotify_token !== 'undefined') {
        if (req.cookies.spotify_token) {
          res.locals.loginSpotify = true;
        }
      }

      if (typeof next !== 'undefined') {
        return next();
      }

      return res.locals.loginSpotify;
    }
};

module.exports = auth;
