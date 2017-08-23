var expressLayouts = require('express-ejs-layouts');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

var auth = require('./auth.js');
var conf = require('./conf.js');
var index = require('./routes/index');
var users = require('./routes/users');
var trajet = require('./routes/trajet');
var spotify = require('./routes/spotify');



var meteo = require('./routes/meteo');
var request = require('request');

var app = express();

var server = require('http').createServer(app);
app.use(cors());

//Socket io
var io = require('socket.io')(server, { origins: '*:*'});
server.listen(conf.parameters().serv().port, conf.parameters().serv().ip);

io.on('connection', function(client) {
	console.log('client connect');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( function(req, res, next) {
  res.io = io
  next()
});

app.use( function(req, res, next) {
  res.conf = conf
  next()
});

// Get the token
app.use(auth.init());

app.use('/', index);
app.use('/users', users);
app.use('/trajet', trajet);
app.use('/meteo', meteo);
app.use('/spotify', spotify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
