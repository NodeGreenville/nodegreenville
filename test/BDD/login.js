const spawn = require('child_process').spawn;
var child;
const PORT = process.env.PORT || 3000;

module.exports = {
  before : function(browser) {
    child = spawn('node', ['./bin/www']);
  },
  after : function(browser) {
    child.kill();  // Shutdown processes after tests
  },
  'Login modal appears' : function (browser) {

    browser
      .url('http://localhost:' + PORT)
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('li a#login', 1000)
      .click('a#login')
      .pause(1000)
      .assert.elementPresent('#submit-icon')
      .end();
  }
};
