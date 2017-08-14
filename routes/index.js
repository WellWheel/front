var express = require('express');
var router = express.Router();

var auth = require('../auth.js');

/* GET login page. */
router.get('/',  function(req, res, next) {
  res.render('login', { title: 'Pimp my road' });
});

/* GET creation compte page. */
router.get('/CreationCompte', function(req, res, next) {
  res.io.emit('messages', 'test msg');
  res.render('creationLogin', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/Accueil', auth.isAuthenticated, function(req, res, next) {
    console.log('A token is decoded ?');
    console.log(req.user);
    res.render('dashboardAccueil', { title: 'Pimp my road' });
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
module.exports = router;

/* GET visites page. */
router.get('/vos-visites', function(req, res, next) {
  res.render('visites', { title: 'Pimp my road' });
});
module.exports = router;
