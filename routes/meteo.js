var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');

/* GET meteo page. */
router.get('/', auth.isAuthenticated, function(req, res, next) {
	res.render('meteo', {
        title: 'Pimp my road',
        token:  req.cookies.my_token,
        socketHost: res.conf.parameters().serv().full()
    });
});


module.exports = router;
