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
    }
}

module.exports = socketService;
