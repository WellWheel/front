var express = require('express');
var router = express.Router();
var request = require('request');	

/* GET login page. */
router.get('/', function(req, res, next) {
	request({
	    url: "http://192.168.33.10/app_dev.php/meteo/lyon",
	    method: "POST",
	    json: true,   // <--Very important!!!
	    body: {}
	}, function (error, response, body){
	    console.log(response);
	});


  	res.render('meteo', { title: 'Pimp my road' });
});


module.exports = router;