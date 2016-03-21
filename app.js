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
var app = express();
var ParseServer = require('parse-server').ParseServer;
var flash = require('connect-flash');

if (!process.env.REST_KEY) {
	require('dotenv').load();
}

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
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

var api = new ParseServer({
  databaseURI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  cloud: './cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  fileKey: process.env.FILE_KEY || 'myFileKey',
  masterKey: process.env.MASTER_KEY || 'mySecretMasterKey',
  restAPIKey: process.env.REST_KEY || 'myRESTAPIKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse'
});

app.use('/', home);
app.use('/events', events);
app.use('/auth', require('./routes/auth')(passport));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') ==='staging') {
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
