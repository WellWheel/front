var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');
var spotifyService = require('../service/spotifyService.js');

var qs = require("querystring");

/* GET trajet page. */

router.get('/', auth.isAuthenticated, function (req, res, next) {

    var options = {
      url: res.conf.parameters().api().full() + "/api/journey/1",
      headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
      json: true
    };

    //request.get(options, function(error, response, body) {
    //	var trajets= [
    //					{nom : 'mylene', parcours : 'trajet 1'},
    //					{nom : 'florian', parcours : 'trajet 2'}
	//	];

    //  res.render('trajets', { title: 'Pimp my road', trajets: trajets });
    //});


	// use the access token to access Web API
	request.get(options, function(error, response, body) {
		console.log(body.list_user);
		// console.log(body);
		// console.log(response);
      res.render('trajets', { title: 'Pimp my road', trajets: body.list_user });
    });


})


/* POST mise a jour voyage trajet page. */

router.post('/', auth.isAuthenticated, function (req, res) {
    var data = {
      name : req.body.name,
      public : false
    };

    var options = {
      url: res.conf.parameters().api().full() + '/api/journey/update/2',
      headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
      body: data,
      json: true
    };

    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, body) {
      res.redirect('/trajets');
    });

})


/* GET creation trajet page. */
router.get('/creation', auth.isAuthenticated, spotifyService.getPlaylists, function(req, res, next) {
    var playlists = undefined;

    console.log("res.playlists : " + res.playlists);

    if (typeof res.playlists !== 'undefined')
        playlists = res.playlists;



    res.render('creationTrajet', { title: 'Pimp my road', playlists: playlists });
});
router.post('/delete', auth.isAuthenticated, function (req, res, next) {
console.log("coucou");
console.log("req: " + req.body.idvoyage);
    var options = {
      url: res.conf.parameters().api().full() + "/api/journey/delete/" + req.body.idvoyage,
      headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
      json: true
    };
    console.log(options);
  request.delete(options, function(error, response, body) {
    res.redirect('/trajet');
  });


})
/* POST creation trajet page. */
router.post('/creation', auth.isAuthenticated, function(req, res, next) {
    console.log("test");
    console.log("BODY : " + JSON.stringify(req.body) );

    var data = {
        origin: req.body.start,
        destination: req.body.end,
        iduser: '1',
    };
    console.log(data);
    var options = {
      url: res.conf.parameters().api().full() + '/api/journey/create',
      headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
      body: data,
      json: true
    };

    request.post(options, function(error, response, body) {
      res.redirect('/trajet');
    });
});



module.exports = router;
