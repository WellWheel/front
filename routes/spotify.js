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

router.get('/', function(req, res) {
  console.log("trajet");
  res.render('spotify', { title: 'Pimp my road' });
});

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: res.conf.parameters().apiSpotify().client_id,
      scope: scope,
      redirect_uri: res.conf.parameters().apiSpotify().redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {

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
            res.cookie('spotify_token', access_token, { maxAge: 900000, httpOnly: true });

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/spotify/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/spotify/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(res.conf.parameters().apiSpotify().client_id + ':' + res.conf.parameters().apiSpotify().client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.cookie('spotify_token', access_token, { maxAge: 900000, httpOnly: true });

      res.send({
        'access_token': access_token
      });
    }
  });
});

router.get('/playlists', auth.isSpotifyAuthenticated, function (req, res) {

    var options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + req.cookies.spotify_token },
      json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
      console.log(body);

      res.render('playlistSpotify', { title: 'Pimp my road', playlists: body.items });
    });

})

router.post('/playlists', auth.isSpotifyAuthenticated, function (req, res) {

    var options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + req.cookies.spotify_token },
      data: querystring.stringify(req.body),
      json: true
    };

    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, body) {
      console.log("options : " + JSON.stringify(options));
      console.log("Body after add playlist : " + body);
      console.log("error after add playlist : " + error);
      console.log("response after add playlist : " + JSON.stringify(response));

      res.redirect('/spotify/playlists');
    });

})
module.exports = router;
