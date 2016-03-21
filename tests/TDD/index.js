var hbs = require('express-hbs');
require('../../helpers/hbsHelpers')(hbs);

module.exports = {
  'Test HandlebarsHelpers': function(client) {
    this.fields = {
      event: [
        {
          name: 'my event',
          time: 1450292400000,
          duration: 5400000,
          venue: {
            name: 'place',
            address_1: '123 Street'
          },
          description: 'fun', yes_rsvp_count: 0
        }
      ]
    };
    var template = hbs.compile("{{{constructJSON event}}}");
    var result = template(this.fields).trim();
    var expected = '[{"title":"my event","start":"2015-12-16T19:00:00+00:00","end":"2015-12-16T20:30:00+00:00","venue":"place","address":"123 Street","description":"fun","rsvp":0}]';
    client.assert.equal(result, expected);
  }
}
