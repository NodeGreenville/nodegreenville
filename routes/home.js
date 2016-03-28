var express = require('express');
var router = express.Router();

module.exports = function(appName) {
	router.get('/', function(req, res, next) {
		res.render('home', {
			authenticated: req.isAuthenticated(),
			user: req.user,
			appName: appName
		});
	});

	router.get('/logout', function(req, res, next) {
		req.logout();
		res.redirect('/');
	});
	return router;
}
