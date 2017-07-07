var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
	console.log(req.body);
	request({
	    url: "http://192.168.33.10/app_dev.php/register",
	    method: "POST",
	    json: true,   // <--Very important!!!
	    body: req.body
	}, function (error, response, body){
	    console.log(response);
	});
});

module.exports = router;