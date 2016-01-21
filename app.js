var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var hbs = require('express-hbs');
var home = require('./routes/home');
var events = require('./routes/events');
var passport = require('passport');
require('dotenv').load();
var app = express();

// view engine setup
app.engine('hbs', hbs.express4({
	partialsDir: __dirname + '/views/layout/partials',
	defaultLayout: __dirname + '/views/layout/default.hbs',
	layoutsDir: __dirname + '/views/layout'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Handlebars Helpers must be invoked with instance of express-hbs
require('./helpers/hbsHelpers')(hbs);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.GITHUB_CLIENT_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/events', events);
app.use('/auth', require('./routes/auth')(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
