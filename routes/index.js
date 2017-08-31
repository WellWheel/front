var express = require('express');
var router = express.Router();
var auth = require('../auth.js');
var request = require('request');
var qs = require("querystring");
var auth = require('../auth.js');

/* GET login page. */
router.get('/',  function(req, res, next) {
  res.locals.login = false;

  if (typeof req.cookies.my_token !== 'undefined') {
    res.locals.login = true;
  }

  res.render('login', { title: 'Pimp my road' });
});

/* GET creation compte page. */
router.get('/CreationCompte', function(req, res, next) {
    res.render('creationLogin', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/Accueil', auth.isAuthenticated, function(req, res, next) {

    console.log('A token is decoded ?');
    console.log(req.user);

    var options = {
        url: res.conf.parameters().api().full() + "/api/journey/list",
        headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
        json: true
    };

    request.get(options, function(error, response, body) {
        console.log(body.list_journey);
        res.render('dashboardAccueil', {
            title: 'Pimp my road' ,
            token: req.cookies.my_token,
            trajets: body.list_journey,
            socketHost: res.conf.parameters().serv().full()
          });
    });
});


/* GET meteo page. */
router.get('/votre-meteo', function(req, res, next) {
  res.render('meteo', { title: 'Pimp my road' });
});

/* GET playlist Spotify page. */
router.get('/votre-playlist-Spotify', function(req, res, next) {
  res.render('playlistSpotify', { title: 'Pimp my road' });
});

/* GET articles page. */
router.get('/vos-articles', function(req, res, next) {
  res.render('articles', { title: 'Pimp my road' });
});

/* GET visites page. */
router.get('/vos-visites', function(req, res, next) {
  res.render('visites', { title: 'Pimp my road' });
});


/* GET visites page. */
router.get('/parameters', auth.checkSpotifyAuthenticated, function(req, res, next) {

  res.render('parameters', { title: 'Pimp my road' });
});

router.get('/voice/init', function (req, res, next) {

  res.statusCode = 302;
  res.setHeader("Location", '/parameters');
  res.cookie('voice', true, { maxAge: 3300000, httpOnly: true });
  res.end();
});

router.get('/voice/destroy', function (req, res, next) {

  res.locals.login = false;
  res.clearCookie("voice");
  res.statusCode = 302;
  res.setHeader("Location", '/parameters');

  res.end();
});

module.exports = router;

