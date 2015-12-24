var moment = require('moment');

var HbsHelpers = function(hbs) {
	hbs.registerHelper('constructJSON', function(context, block) {
		var calEvents = context.map(function(event) {
			var calEvent = {};
			calEvent.title = event.name;
			calEvent.start = moment(event.time).utc().add(event.utc_offset, 'ms').format();
			calEvent.end = moment(event.time).utc().add(event.utc_offset, 'ms').add(event.duration, 'ms').format();
			calEvent.venue = event.venue.name;
			calEvent.address = event.venue.address_1;
			calEvent.description = event.description;
			calEvent.rsvp = event.yes_rsvp_count;
			return calEvent;
		});

		return JSON.stringify(calEvents);
	});
}

module.exports = HbsHelpers;
