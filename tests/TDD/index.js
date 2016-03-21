/*var chai = require('chai');
var assert = chai.assert;  // nightwatch includes an assert library
var fs = require('fs');
var expect = chai.expect;
var request = require('supertest');*/
var hbs = require('express-hbs');
var app = require('../../app');
var spawn = require('child_process').spawn;
var child;
var child_running;

module.exports = {
  before: function(client, done) {
    done();
  },
  after: function(client, done) {
    client.end(function() {
      done();
    });
  },
  'demo Routes': function(client) {
    // For async stuff
    console.log('What is client?');
    console.log(client);
    client.assert.ok('TEST');
  },
  testHandlebarsHelpers: function(client) {
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
    //expect(result).to.equal(expected);
    client.assert.equal(result, expected);
  },
  after: function(client) {
    process.exit(0);  // For some reason we need to call this explicitely
  }
}
