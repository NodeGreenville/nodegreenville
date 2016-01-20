var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

// Authentication setup

/*
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


router.get('/github', passport.authenticate('github'{ scope: ['user:email']}));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
},
function (req, res) {
  res.redirect('/');
}));



module.exports = router;
*/
