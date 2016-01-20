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
var auth = require('./routes/auth');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').load();
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var app = express();

passport.use('github', new GitHubStrategy({
		clientID: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
		callbackURL: 'http://localhost:3100/auth/github/callback'
	},
	function (accessToken, refreshToken, profile, done) {
    console.log(profile);
		return done(null, profile);
	}
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


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
	secret: GITHUB_CLIENT_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/events', events);

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {

	});

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/');
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});



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
