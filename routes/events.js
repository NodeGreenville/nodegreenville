var express = require('express');
var async = require('async');
var router = express.Router();

require('dotenv').config({silent: true});

var meetup = require('meetup-api')({
	key: process.env.MEETUP_API
});

module.exports = function(appName) {
	router.get('/', eventsRoute);
	function eventsRoute(req, res, next) {
		async.parallel({ group: getGroup, events: getEvents }, renderIndex.bind(null, res, next));
	}

	function getGroup(callback) {
		meetup.getGroup({'urlname': process.env.MEETUP_GROUP_NAME}, callback);
	}

	function getEvents(callback) {
		meetup.getEvents({'group_urlname': process.env.MEETUP_GROUP_NAME,
						  'status': 'upcoming,past'}, callback);
	}

	function renderIndex(res, next, err, results) {
		if (err) {
			return next(err);
		}

		res.render('events', {
			group: results.group,
			events: results.events.results,
			appName: appName
		});
	}
	return router;
}
