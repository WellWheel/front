var request = require('request');
var conf = require('../conf.js');

var socketService = {
    up: function (io) {
        io.on('connection', function (client) {
            console.log("!! client connected !!")
            socketService.loadEvents(client);
        });
    },
    loadEvents: function (client) {
        this.meteoAccueil(client);
        this.deletePlaylist(client);
        this.searchtrack(client);
        this.deletetrack(client);
        this.addtrack(client);
    },
    meteoAccueil: function (client) {
        client.on('localization', function (data) {
            console.log("conf.parameters().api().full()" + conf.parameters().api().full())
            request({
                url: conf.parameters().api().full() + "/api/meteo/",
                method: "POST",
                json: true,   // <--Very important!!!
                body: data,
                headers: {
                  "Authorization" : "Bearer " + data.token
                }
            }, function (error, response, body) {
                if(response.statusCode === 200 || response.statusCode === 201)
                      client.emit('dataMeteo',body.datas);

                      if (error !== null){
                        console.log('error' + error);
                        client.emit('error', error)
                      }
            });
      });
    },
    deletePlaylist : function (client) {
        client.on('deletePlaylist', function(data) {
            var id = data.id;
            var options = {
                url: 'https://api.spotify.com/v1/users/' + data.id_spotify + '/playlists/' + data.idPlaylist + '/followers',
                headers: {
                    'Authorization': 'Bearer ' + data.spotify_token
                },
                json: true
            };
            request.delete(options, function(error, response, body) {
                if(response.statusCode == 200 || response.statusCode == 201) {
                    console.log(body);
                    client.emit('playlistDeleted', data.idPlaylist);
                }
                if(error !== null) {
                    console.log(error);
                    client.emit('error', error);
                }
            });
        });
    },
     searchtrack: function (client) {
        client.on('searchtrack', function(data) {
                var track = data.title;
                var url = 'https://api.spotify.com/v1/search?q=' + track + '&type=track&limit=6';

                var options = {
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + data.spotify_token
                    },
                    json: true
                };
                request.get(options, function(error, response, body) {
                    console.log("Track Found Get Before Emit");
                    client.emit('trackfound', body);
                });
            })
    },
    deletetrack: function (client) {
        client.on('deletetrack', function(data) {
            var trackId = data.id;
            var position = data.position;

            var infosTrack = {
                tracks: [{
                    uri: "spotify:track:"+trackId,
                    positions: [position]
                }],
            };

            var url = 'https://api.spotify.com/v1/users/' + data.id_spotify + '/playlists/' + data.idPlaylist + '/tracks';

            var options = {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + data.spotify_token
                },
                body: infosTrack,
                json: true
            };
            request.delete(options, function(error, response, body) {
                client.emit('deleted', position);
            });
        })
    },
    addtrack: function (client) {
       client.on('addtrack', function(data) {
            var trackId = data.trackId;
            var url = 'https://api.spotify.com/v1/users/' + data.id_spotify + '/playlists/' + data.idPlaylist + '/tracks?uris=spotify%3Atrack%3A' + trackId;

            var options = {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + data.spotify_token
                },
                json: true
            };
            request.post(options, function(error, response, body) {
                if(response.statusCode == 200 || response.statusCode == 201) {
                    var url2 = 'https://api.spotify.com/v1/tracks/' + trackId;

                    var options2 = {
                        url: url2,
                        headers: {
                            'Authorization': 'Bearer ' + data.spotify_token
                        },
                        json: true
                    };
                    request.get(options2, function(error, response, body) {
                        client.emit('added', body);
                    });
                }
                if(error !== null) {
                    console.log(error);
                    client.emit('error', error);
                }
            });
        })
    }
}

module.exports = socketService;
