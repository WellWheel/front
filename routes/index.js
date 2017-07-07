var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Pimp my road' });
});

/* GET creation compte page. */
router.get('/CreationCompte', function(req, res, next) {
  res.io.emit('messages', 'test msg');
  res.render('creationLogin', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/Accueil', function(req, res, next) {
  res.render('dashboardAccueil', { title: 'Pimp my road' });
});

/* GET trajet page. */
router.get('/vos-trajets', function(req, res, next) {
  res.render('trajets', { title: 'Pimp my road' });
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