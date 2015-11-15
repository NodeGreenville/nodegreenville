var moment = require('moment');

var HbsHelpers = function(hbs) {
	hbs.registerHelper('dateFormat', function(context, block) {
		var format = block.hash.format || 'MM/DD/YYYY';
		return moment(context).format(format);
	});

	hbs.registerHelper('timeFormat', function(context, block) {
		var format = block.hash.format || 'h:mm a';
		return moment(context).utc().add(block.hash.utc, 'milliseconds').format(format);
	});

	hbs.registerHelper('daysLeft', function(context, block) {
		var eventDate = moment(context);
		var currentDate = moment();
		return eventDate.diff(currentDate, 'days');
	});
}

module.exports = HbsHelpers;