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
    child.kill();  // Shutdown processes after tests
  },
  'Home View' : function (browser) {
    var node = 'h1 span.font-brand';
    browser
      .url('http://localhost:' + PORT)
      .waitForElementVisible(node, 10000)
      .getText(node, function(result) {
        this.assert.equal(result.value, "NodeGreenville")
      })
      .end();
  },
  'Events View' : function (browser) {
    browser
      .url('http://localhost:' + PORT + '/events')
      .waitForElementVisible('#calendar', 5000)
      .end();
  }
};
