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
            }
        }

        return params;
    }
}
