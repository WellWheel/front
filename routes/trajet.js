var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');

var qs = require("querystring");

/* GET trajet page. */
router.get('/', function(req, res, next) {
  console.log("trajet");
  res.render('trajets', { title: 'Pimp my road' });
});

/* GET meteo page. */
router.get('/creation', auth.isAuthenticated, function(req, res, next) {
    res.render('creationTrajet', { title: 'Pimp my road' });
});

/* POST meteo page. */
router.post('/creation', auth.isAuthenticated, function(req, res, next) {

    console.log("BODY : " + JSON.stringify(req.body) );

    res.render('creationTrajet', { title: 'Pimp my road' });
});

module.exports = router;
