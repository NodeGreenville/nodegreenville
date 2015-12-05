var chai = require('chai');
var assert = chai.assert;
var fs = require('fs');
var expect = chai.expect;
var request = require('supertest');
var hbs = require('express-hbs');
var app = require('../app');
var events = require('../routes/events');

describe('Routes', function() {
	var htmlHead;
	it('should respond with 200 from home', function(done){
		this.timeout(5000);
		request(app)
			.get('/')
			.expect(200, function(err, res) {
				if (err) done(err);
				htmlHead = res.text; // saving for round-trip comparison below
				done();
			});
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

	it('should respond with 200 blog', function(done) {
		this.timeout(5000);
		request(app)
			.get('/blog/') // this returns 303 sans the last forward slash
			.expect(200, done)
	});

	it('should contain correct head html when navigating back to home from blog',
			function(done) {
				var agent = request.agent(app);
				agent
					.get('/')
					.expect(200, function(err, res) {
						if (err) done(err);
					});
			  agent.get('/blog/')
					.expect(200, function(err, res) {
						if (err) done(err);
					});
				agent.get('/') // navigate back to home
					.expect(200, function(err, res) {

						if (err) done(err);
						$ = require('cheerio').load(htmlHead);  // original html <head>
						$$ = require('cheerio').load(res.text); // round trip html <head>
						/**
						 * This should be true if the round trip <head> tag has just as many
						 * children as the original <head> tag. This will fail otherwise.
						 */
						assert.equal($$('head').children().length, $('head').children().length);
						done();
					});
				});

	it('should respond with 404 from everything else', function(done) {
		request(app)
			.get('/foo/bar')
			.expect(404, done);
	});
});

describe('Handlebars Helper', function() {
	var fields;

	beforeEach(function() {
		this.fields = { time: 1447891200000 }; // November 18, 2015 7:00 PM
	});

	describe('isoFormat helper test', function() {
		it('should format timestamp iso8601 string', function() {
            this.fields['utc_offset'] = -18000000;
			var template = hbs.compile("{{isoFormat time utc=utc_offset}}");
			var result = template(this.fields).trim();
			var expected = '2015-11-18T19:00:00+00:00';
			expect(result).to.equal(expected);
		});
	});

});
