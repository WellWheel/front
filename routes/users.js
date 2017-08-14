var express = require('express');
var router = express.Router();
var request = require('request');
var qs = require("querystring");
var jwt = require("jwt-simple");
var auth = require('../auth.js');

/* GET users listing. */
router.post('/login', function(req, res, next) {
	request({
	  url: "http://" + res.conf.parameters().api().ip + "/api/login_check",
      body: qs.stringify(req.body),
      method: "POST",
	  headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'cache-control': 'no-cache'
	  }
	}).on('response', function(response) {

		  	if(response.statusCode === '401')
		  	{
				console.log('401, not accessible for login, show the back.')

				res.redirect("/");
		  	}
		  	else
		  	{
		  		if(response.statusCode === 201 || response.statusCode === 200 )
		  		{
				  	response.on('data', function(data) {
							var datas = JSON.parse(data);
							console.log("Success login");

				  			res.statusCode = 302;
							res.setHeader("Location", '/Accueil');
    						res.cookie('my_token', datas.token, { maxAge: 900000, httpOnly: true });
							res.end();
					  })
		  		} else {
					console.log("Bad login");
					res.redirect("/");
		  		}
		  	}

	});
});

router.post('/create', function (req, res, next) {

	request({
	  url: "http://" + res.conf.parameters().api().ip + "/api/register",
      body: qs.stringify(req.body),
      method: "POST",
	  headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'cache-control': 'no-cache'
	  }
	}).on('response', function(response) {
		  	if(response.statusCode === '401') {
		      console.log('401, not accessible for register, show the back.')
		  	} else {
		  		if(response.statusCode === 201) {
		  			console.log("success");
		  			res.statusCode = 302;
					res.setHeader("Location", '/');
					res.end();
		  		} else {
		  			console.log("fail");
		  			res.redirect("/CreationCompte");
		  		}
		  	}
	});

});

/* GET login page. */
router.get('/deco', auth.isAuthenticated, function(req, res, next) {
	res.clearCookie("my_token");
	res.statusCode = 302;
	res.setHeader("Location", '/');
	res.end();
});

module.exports = router;
