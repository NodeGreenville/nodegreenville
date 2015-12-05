var moment = require('moment');

var HbsHelpers = function(hbs) {
	hbs.registerHelper('isoFormat', function(context, block) {
		var addOn = block.hash.duration || 0;
		return moment(context).utc().add(block.hash.utc, 'ms').add(addOn, 'ms').format();
	});
}

module.exports = HbsHelpers;
