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

#### Install

0. `cd project folder`
1. `git clone https://github.com/WellWheel/front`
2. `cd front && npm install && node_modules/bower/bin/bower install`

#### Configure

All parameters for configure the api and the application itself are on `conf.js`:

1. api

    Change api serveur.

2. nodemonServer

    Useful for dev. Just change it.

3. Docker

    Switch to docker and use your host name directly.

#### Run

In debug mode:

`DEBUG=front:* npm start` or `node_modules/gulp/bin/gulp.js serve:dev`

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
