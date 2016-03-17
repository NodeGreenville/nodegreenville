var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	// Once req.flash is called it is erased
	// so consoling it here deletes it before reaching the template

	res.render('home', {
		authenticated: req.isAuthenticated(),
		user: req.user,
		message: req.flash('error')
	});
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
