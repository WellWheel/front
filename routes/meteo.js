var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');

/* GET meteo page. */
router.get('/', auth.isAuthenticated, function(req, res, next) {
    console.log("Météo : token is " +  req.cookies.my_token);

	res.render('meteo', { title: 'Pimp my road', token:  req.cookies.my_token });
});


module.exports = router;
