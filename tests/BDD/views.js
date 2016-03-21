const spawn = require('child_process').spawn;
var child;
const PORT = process.env.PORT || 3000;

module.exports = {
  before : function(browser, done) {
    child = spawn('node', ['./bin/www']);
    setTimeout(function() {
      done();
    }, 5000);
  },
  after : function(browser) {
    browser.end(function() {
      child.kill();
    });
  },
  'Login modal appears' : function (browser) {
    browser
      .url('http://localhost:' + PORT)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('li a#login', 5000)
      .click('a#login')
      .pause(1000)
      .assert.elementPresent('#submit-icon');
  },
  'Home View' : function (browser) {
    var node = 'h1 span.font-brand';
    browser
      .url('http://localhost:' + PORT, function(response) {
        console.log('The response: ');
        console.log(response);
        browser.assert.equal(response.state, 'success');
      })
      .waitForElementVisible(node, 10000)
      .getText(node, function(result) {
        this.assert.equal(result.value, "NodeGreenville")
      });
  },
  'Events View' : function (browser) {
    browser
      .url('http://localhost:' + PORT + '/events')
      .waitForElementVisible('#calendar', 5000);
  },
  'Test 404': function(browser) {
    browser
      .url('http://localhost:' + PORT + '/fake/route')
      .getText('h1', function(result) {
        this.assert.equal(result.value, "Not Found");
      })
      .getText('h2', function(result) {
        this.assert.equal(result.value, "404");
      });

  }
};
