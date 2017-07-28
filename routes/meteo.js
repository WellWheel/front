var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');

/* GET meteo page. */
router.get('/', auth.isAuthenticated, function(req, res, next) {
    console.log('ICII');

    res.io.on('connection', function (client) {
		client.on('localization', function (data) {

			request({
			    url: "http://wellwheel.dev/api/meteo/",
			    method: "POST",
			    json: true,   // <--Very important!!!
			    body: data,
		        headers: {
		          "Authorization" : "Bearer " + localStorage.getItem("my_token")
		        }
			}, function (error, response, body){
				if(response.statusCode === 200 || response.statusCode === 201)
                  	client.emit('dataMeteo',body.datas);

                if (typeof error !== 'undefined'){
                	console.log('error' + error);
                	client.emit('error', error)
                }
			});
      	});
	});

	res.render('meteo', { title: 'Pimp my road' });
});


module.exports = router;
