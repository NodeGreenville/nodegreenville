var request = require('supertest');
var app = require('../app');

function checkForMultipleGhostStatusCodes(res) {
		/* Ghost blog will responde with 303 or 200 */
		if (200 == res.statusCode || 303 == res.statusCode) {

		} else {
			throw new Error("Received: " + res.statusCode);
		}
}

describe('Routes', function() {
	it('should return a 200', function(done){
		request(app)
			.get('/')
			.expect(200, done);
	});

	it('should return a 303 or 200 for /blog path', function(done) {
		request(app)
			.get('/blog')
			.expect(checkForMultipleGhostStatusCodes)
			.end(done);
	});
})
