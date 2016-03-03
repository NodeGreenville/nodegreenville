var express = require('express');
var router = express.Router();
var GitHubStrategy = require('passport-github2').Strategy;
var github = require('octonode');

// Authentication setup
module.exports = function (passport) {

	passport.use('github', new GitHubStrategy({
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		},
		function (accessToken, refreshToken, profile, done) {

			// check if user is a member of the group
			var client = github.client(accessToken);
			client.get('/user/orgs', {}, function (err, status, body, headers) {
				var orgIDs = body.map(function (obj) {
					return obj.id;
				});

				var NODEGREENVILLE_ID = parseInt(process.env.NODEGREENVILLE_ID);
				var member = orgIDs.indexOf(NODEGREENVILLE_ID) >= 0;
				if (member) {
					// User is apart of the NodeGreenville Group log them in
					return done(null, profile);
				} else {
					return done(null, false);
				}
			});
		}
	));

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	router.get('/github', passport.authenticate('github', { scope: ['user:email', 'read:org']}));
	router.get('/github/callback', passport.authenticate('github', {
	  failureRedirect: '/',
		failureFlash: true
	}),
	function (req, res) {
	  res.redirect('/');
	});

	return router;
}
