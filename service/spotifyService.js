var request = require('request');
var auth = require('../auth');

module.exports = {
    getPlaylists: function (req, res, next) {
      if (auth.isSpotifyAuthenticated) {
        var options = {
          url: 'https://api.spotify.com/v1/me/playlists',
          headers: { 'Authorization': 'Bearer ' + req.cookies.spotify_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          res.playlists = body.items;

          return next();
        });
      } else {
         return next();
      }

    }

};

