var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('home', {
		authenticated: req.isAuthenticated(),
		user: req.user
	});
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
