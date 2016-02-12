var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var app = require('../../app');
var platform = process.platform;
var nightwatch = require('nightwatch');


describe('Test Login Page', function() {

  it('should come into the BDD folder', function() {
    assert.equal(1, 1);
    console.log('Entered BDD');
  });

});
