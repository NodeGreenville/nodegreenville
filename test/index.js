var request = require('supertest');
var app = require('../app');

it('should return a 200', function(done){
	request(app)
		.get('/')
		.expect(200, done);
});