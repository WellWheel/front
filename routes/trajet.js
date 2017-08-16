var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');
var spotifyService = require('../service/spotifyService.js');

var qs = require("querystring");

/* GET trajet page. */
router.get('/', function(req, res, next) {
  console.log("trajet");
  res.render('trajets', { title: 'Pimp my road' });
});

/* GET meteo page. */
router.get('/creation', auth.isAuthenticated, spotifyService.getPlaylists, function(req, res, next) {
    var playlists = undefined;

    console.log("res.playlists : " + res.playlists);

    if (typeof res.playlists !== 'undefined')
        playlists = res.playlists;

    res.render('creationTrajet', { title: 'Pimp my road', playlists: playlists });
});

/* POST meteo page. */
router.post('/creation', auth.isAuthenticated, function(req, res, next) {

    console.log("BODY : " + JSON.stringify(req.body) );

    res.redirect('/trajet/creation');
});

module.exports = router;
