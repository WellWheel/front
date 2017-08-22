# Front

>
	           _____
              /     \
              vvvvvvv  /|__/|
                 I   /O,O   |
                 I /_____   |      /|/|
                J|/^ ^ ^ \  |    /00  |    _//|
                 |^ ^ ^ ^ |W|   |/^^\ |   /oo |
                  \m___m__|_|    \m_m_|   \mm_|


##### TL;DR

With scotch box:

`make API_HOSTNAME_OR_IP="192.168.33.10"  SOCKET_IP="nodemonServer" REDIRECT_SPOTIFY_IP_FQDN="localhost" REDIRECT_SPOTIFY_PORT="3000"`

Go to: 

http://localhost:3000/

#### Install

0. `cd project folder`
1. `git clone https://github.com/WellWheel/front`
2. `cd front && npm install && node_modules/bower/bin/bower install`

#### Configure

All parameters for configure the api and the application itself are on `conf.js`. The `conf.js.dist` is use with 4 variable: 

For information this is the variable. 

```
API_HOSTNAME_OR_IP : our api;
SOCKET_IP : socket serveur launch on back;
REDIRECT_SPOTIFY_IP_FQDN : redirirect callback for spotify api (after login);
REDIRECT_SPOTIFY_PORT : port of our front app.
```

Whole site: 

1. api

    Change api serveur.

2. nodemonServer

    Useful for dev. Just change it.

3. Docker

    Switch to docker and use your host name directly.

4. Spotify
    
    Redirect uri MUST be confirgured.

#### Install

Use make to start everything:

1. Make (best)

    `make API_HOSTNAME_OR_IP="192.168.33.10"  SOCKET_IP="nodemonServer" REDIRECT_SPOTIFY_IP_FQDN="localhost" REDIRECT_SPOTIFY_PORT="3000"`

2. npm script for start serveur

    `DEBUG=front:* npm start`

3. Gulp

    `node_modules/gulp/bin/gulp.js serve:dev`

#### Reinstall

    `make reinstall API_HOSTNAME_OR_IP="192.168.33.10"  SOCKET_IP="nodemonServer" REDIRECT_SPOTIFY_IP_FQDN="localhost" REDIRECT_SPOTIFY_PORT="3000"`
    `make full-reinstall API_HOSTNAME_OR_IP="192.168.33.10"  SOCKET_IP="nodemonServer" REDIRECT_SPOTIFY_IP_FQDN="localhost" REDIRECT_SPOTIFY_PORT="3000"`



#### Run 

    `make start`

#### Show everything at


http://localhost:3000/

or with scotchbox

http://192.168.33.10:3000/

#### Livereload plugin

Add plugin for LiveReload by browser:

[Firefox](https://addons.mozilla.org/fr/firefox/addon/livereload/)

[Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/related)

#### Gulp

Gulp allow us to make our task automaticly.

|Task                                 |Purpose					                                            |
|--                   				  |--  						                                            |
|npm install                          | Start with live reload, watch etc.( Plugin to add - see below )     |
|node_modules/bower/bin/bower install | Install bower dependencies                                          |
|node_modules/bower/bin/bower install  package_on_bower_io --save | Install a package                       |
|node_modules/gulp/bin/gulp.js serve:dev  | Start with live reload, watch etc.( Plugin to add - see below )     |dependencies                                           |
|node_modules/gulp/bin/gulp.js serve:prod  | Start for prod (pm2 need)     |dependencies                                           |


#### Routes

Whole express routes unprotected:

|Route           |Purpose|
|--              |--|
|/               | login    |
|/creationCompte | create account |

Whole express routes protected:

|Route           |Purpose|
|--              |--|
|/users/deco     |logout GET |
|/accueil        | layout GET |
|/meteo/         | meteo of the current place |
|/trajet/         | list trajet GET |
|/trajet/creation         | show form trajet via GET |
|/trajet/creation         | send form trajet via POST |
|/spotify/ |  connect to spotify - show profile information GET |
|/spotify/playlists | show whole play list - GET |
|/spotify/playlists | add a playlist with a name (private by default) - POST |
