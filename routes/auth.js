var express = require('express');
var router = express.Router();
var GitHubStrategy = require('passport-github2').Strategy;

// Authentication setup
module.exports = function (passport) {

	passport.use('github', new GitHubStrategy({
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/github/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	));

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	router.get('/github', passport.authenticate('github', { scope: ['user:email']}));
	router.get('/github/callback', passport.authenticate('github', {
	  failureRedirect: '/',
		failureFlash: 'Login failed'
	}),
	function (req, res) {
	  res.redirect('/');
	});

	return router;
}
