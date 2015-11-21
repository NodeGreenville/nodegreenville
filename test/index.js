var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var hbs = require('express-hbs');
var app = require('../app');
var events = require('../routes/events')

describe('Routes', function() {
	it('should respond with 200 from home', function(done){
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

	it('should respond with 200 blog', function(done) {
		this.timeout(5000);
		request(app)
			.get('/blog/') // this returns 303 sans the last forward slash
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

	beforeEach(function() {
		this.fields = { time: 1447891200000 }; // November 18, 2015 7:00 PM
	});

	describe('dateFormat helper test', function() {
		it('should format timestamp to day of month', function() {
			var template = hbs.compile("{{dateFormat time format='DD'}}");
			var result = template(this.fields).trim();
			var expected = '18';
			expect(result).to.equal(expected);
		});
	});

	describe('timeFormat helper test', function() {
		it('should format timestamp to hour and post or ante meridiem', function() {
			this.fields['utc_offset'] = -18000000;
			var template = hbs.compile("{{timeFormat time format='h a' utc=utc_offset}}");
			var result = template(this.fields).trim();
			var expected = '7 pm';
			expect(result).to.equal(expected);
		});
	});
});
