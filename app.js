var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

var auth = require('./auth.js');
var index = require('./routes/index');
var users = require('./routes/users');

var partials = require('express-partials');

var meteo = require('./routes/meteo');
var request = require('request');

var app = express();

var server = require('http').createServer(app);
app.use(cors());

//Socket io
var io = require('socket.io')(server, { origins: '*:*'});
server.listen(8080, "node");

io.on('connection', function(client) {
	console.log('client connect');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

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

// Get the token
app.use(auth.init());

app.use('/', index);
app.use('/users', users);
app.use('/meteo', meteo);

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
