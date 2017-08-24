var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var auth = require('../auth');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.get('/', auth.isAuthenticated, function(req, res) {
  res.render('spotify', {
    title: 'Pimp my road'
  });
});

router.get('/login', auth.isAuthenticated, function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: res.conf.parameters().apiSpotify().client_id,
      scope: scope,
      redirect_uri: res.conf.parameters().apiSpotify().redirect_uri,
      state: state
    }));
});

router.get('/callback', auth.isAuthenticated, function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/spotify/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: res.conf.parameters().apiSpotify().redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(res.conf.parameters().apiSpotify().client_id + ':' + res.conf.parameters().apiSpotify().client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        res.cookie('spotify_token', access_token, {
          maxAge: 900000,
          httpOnly: true
        });

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          json: true
        };

        // use the access token to access the Spotify Web API to store the user id for calling.
        request.get(options, function(error, response, body) {
          res.cookie('id_spotify', body.id, {
            maxAge: 900000,
            httpOnly: true
          });

          // we can also pass the token to the browser to make requests from there direcly with javascript
          res.redirect('/spotify/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        });

      } else {
        res.redirect('/spotify/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', auth.isAuthenticated, function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(res.conf.parameters().apiSpotify().client_id + ':' + res.conf.parameters().apiSpotify().client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.cookie('spotify_token', access_token, {
        maxAge: 900000,
        httpOnly: true
      });

      res.send({
        'access_token': access_token
      });
    }
  });
});

router.get('/playlists', auth.isAuthenticated, auth.isSpotifyAuthenticated, function(req, res) {

  var options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      'Authorization': 'Bearer ' + req.cookies.spotify_token
    },
    json: true
  };

  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    res.render('playlistSpotify', {
      title: 'Pimp my road',
      playlists: body.items
    });
  });

})

router.post('/playlists', auth.isAuthenticated, auth.isSpotifyAuthenticated, function(req, res) {
  var data = {
    name: req.body.name,
    public: false
  };

  var options = {
    url: 'https://api.spotify.com/v1/users/' + req.cookies.id_spotify + '/playlists',
    headers: {
      'Authorization': 'Bearer ' + req.cookies.spotify_token
    },
    body: data,
    json: true
  };

  // use the access token to access the Spotify Web API
  request.post(options, function(error, response, body) {
    res.redirect('/spotify/playlists');
  });

})

router.get('/playlists/show/:id', auth.isAuthenticated, auth.isSpotifyAuthenticated, function(req, res) {

  var id = req.params.id;

  var options1 = {
    url: 'https://api.spotify.com/v1/users/' + req.cookies.id_spotify + '/playlists/' + id,
    headers: {
      'Authorization': 'Bearer ' + req.cookies.spotify_token
    },
    json: true
  };
  var options2 = {
    url: 'https://api.spotify.com/v1/users/' + req.cookies.id_spotify + '/playlists/' + id + '/tracks',
    headers: {
      'Authorization': 'Bearer ' + req.cookies.spotify_token
    },
    json: true
  };
  var name = "";
  // use the access token to access the Spotify Web API
  request.get(options1, function(error, response, body) {
    name = body.name;
    request.get(options2, function(error, response, body) {
      res.io.on('connection', function(client) {
        client.on('searchtrack', function(data) {

          var track = data.title;
          var url = 'https://api.spotify.com/v1/search?q=' + track + '&type=track&limit=5';

          var options = {
            url: url,
            headers: {
              'Authorization': 'Bearer ' + req.cookies.spotify_token
            },
            json: true
          };
          request.get(options, function(error, response, body) {
              client.emit('trackfound', body);
          });
        })
      })
      res.render('showPlaylist', {
        title: 'Pimp my road',
        playlists: body.items,
        name: name
      });
    });
  });


})


module.exports = router;
