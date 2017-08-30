var express = require('express');
var router = express.Router();
var request = require('request');

var auth = require('../auth.js');
var spotifyService = require('../service/spotifyService.js');

var qs = require("querystring");

/* GET trajet page. */

router.get('/', auth.isAuthenticated, function (req, res, next) {

    var options = {
        url: res.conf.parameters().api().full() + "/api/journey/list",
        headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
        json: true
    };
	request.get(options, function(error, response, body) {
		console.log(body.list_journey);
        res.render('trajets', { title: 'Pimp my road', trajets: body.list_journey });
    });


})
router.get('/show/:id', auth.isAuthenticated, auth.isSpotifyAuthenticated, function (req, res, next) {

    var id = req.params.id;

    var options = {
        url: res.conf.parameters().api().full() + "/api/journey/show/" + id,
        headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
        json: true
    };

	request.get(options, function(error, response, body) {
        console.log("Id Playlist: " + body.playlist);
        var spotify = {
            playlist: body.playlist,
            id: req.cookies.id_spotify
        }
        res.render('showTrajet', { title: 'Pimp my road', steps: body.datas.routes[0].legs[0], info: body.info, spotify: spotify});
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

    if (typeof res.playlists !== 'undefined')
        playlists = res.playlists;
    res.render('creationTrajet', { title: 'Pimp my road', playlists: playlists });
});
router.post('/delete', auth.isAuthenticated, function (req, res, next) {
    var options = {
        url: res.conf.parameters().api().full() + "/api/journey/delete/" + req.body.idvoyage,
        headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
        json: true
    };
    request.delete(options, function(error, response, body) {
        res.redirect('/trajet');
    });
})
/* POST creation trajet page. */
router.post('/creation', auth.isAuthenticated, function(req, res, next) {
    console.log("BODY : " + JSON.stringify(req.body) );
    var idPlaylist = req.body.playlist;
    var origin = req.body.start;
    var destination = req.body.end;
    var data = {
        origin: origin,
        destination: destination,
        iduser: '1',
    };
    var options = {
        url: res.conf.parameters().api().full() + '/api/journey/create',
        headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
        body: data,
        json: true
    };
    request.post(options, function(error, response, body) {

        if (error)
          console.log("error : " + error)

        if((response.statusCode === 201 || response.statusCode === 200)) {
            var data = {
                idplaylist: idPlaylist,
                title: "Playlist : " + origin + " " + destination,
                idjourney: body.idJourney,
            };
            var options2 = {
                url: res.conf.parameters().api().full() + '/api/playlist/new-playlist-to-journey',
                headers: { 'Authorization': 'Bearer ' + req.cookies.my_token },
                body: data,
                json: true
            };
            request.post(options2, function(errorNext, responseNext, bodyNext) {

                if (errorNext)
                  console.log("errorNext : " + errorNext)

                res.redirect('/trajet/');
            });

        }else {
            res.redirect("/trajet/creation");
        }
    });
});



module.exports = router;
