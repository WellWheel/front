var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');


/* GET trajet page. */
router.get('/', function(req, res, next) {
  console.log("trajet");
  res.render('trajets', { title: 'Pimp my road' });
});

/* GET meteo page. */
router.get('/creation', auth.isAuthenticated, function(req, res, next) {
    console.log("trajets:creation : token is " +  req.cookies.my_token);
    console.log("trajets:creation : res.conf.parameters().api.ip is " +  res.conf.parameters().api().ip);


    res.render('creationTrajet', { title: 'Pimp my road' });
});


module.exports = router;
