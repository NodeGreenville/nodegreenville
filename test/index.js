var chai = require('chai');
var assert = chai.assert;
var fs = require('fs');
var expect = chai.expect;
var request = require('supertest');
var hbs = require('express-hbs');
var app = require('../app');
var events = require('../routes/events');

describe('Routes', function() {

	it('should respond with 200 from home', function(done){
		this.timeout(5000);
		request(app)
			.get('/')
			.expect(200, done);
	});

	it('should respond with 200 from events', function(done) {
		/* Takes about 3500ms to complete on average.
		 *  Normal timeout was set to 2000ms which
		 *  yields a false negative for this test case.
		 */
		this.timeout(5000);
		request(app)
			.get('/events')
			.expect(200, done);
	});

	it('should respond with 404 from everything else', function(done) {
		request(app)
			.get('/foo/bar')
			.expect(404, done);
	});
});

describe('Handlebars Helper', function() {
    var fields;

	describe('constructJSON helper test', function() {
		it('should convert meetup object to fc object', function() {
            this.fields = {event: [{name: 'my event', time: 1450292400000,
                duration: 5400000, venue: {name: 'place', address_1: '123 Street'},
                description: 'fun', yes_rsvp_count: 0}]};
			var template = hbs.compile("{{{constructJSON event}}}");
			var result = template(this.fields).trim();
			var expected = '[{"title":"my event","start":"2015-12-16T19:00:00+00:00","end":"2015-12-16T20:30:00+00:00","venue":"place","address":"123 Street","description":"fun","rsvp":0}]';
			expect(result).to.equal(expected);
		});
	});

});
