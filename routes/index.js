var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

router.get('/protected',
  jwt({secret: 'shhhhhhared-secret'}),
  function(req, res) {
  	if (!req.user) return res.sendStatus(401); // User exist and contain info about token if it's resolve
    res.sendStatus(200);
  });

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/CreationCompte', function(req, res, next) {
  res.render('creationLogin', { title: 'Pimp my road' });
});

/* GET dashboard Accueil page. */
router.get('/Accueil', function(req, res, next) {
  res.render('dashboardAccueil', { title: 'Pimp my road' });
});


module.exports = router;
