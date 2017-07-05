var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/Accueil', function(req, res, next) {
  res.render('dashboardAccueil', { title: 'Pimp my road' });
});


module.exports = router;
