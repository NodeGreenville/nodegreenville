var HbsHelpers = function(hbs) {
    hbs.registerHelper('printContext', function(context, block) {
        return JSON.stringify(context);
    });
}

module.exports = HbsHelpers;
