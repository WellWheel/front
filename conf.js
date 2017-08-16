module.exports = {
    parameters : function () {
        var params = {
            nodemonServer: function () {
                return {
                    ip : '127.0.0.1',
                    port: 8080
                };
            },
            dockerServer : function () {
                return {
                    ip : 'node',
                    port: 8080
                };
            },
            serv : function () {
                return {
                    ip : this.nodemonServer.ip,
                    port: this.nodemonServer.port
                };
            },
            api: function () {
                return {
                    ip : "172.16.33.10",
                    port: 80
                };
            },
            apiSpotify: function () {
                return {
                    client_id: '47ba364991014f67ad476aa3c017fad5', // Your client id
                    client_secret: 'af7832793f384d67b78e13ff1c35c8c7', // Your secret
                    redirect_uri: 'http://localhost:3000/spotify/callback' // Your redirect uri
                };
            }
        }

        return params;
    }
}
