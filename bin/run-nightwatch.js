const os = require('os');
const spawn = require('child_process').spawn;
var child;

if(os.platform() === 'win32') {
  var env = (process.env.REST_KEY)? 'BDD_TRAVIS,TDD': 'BDD,TDD';
  child = spawn('node', [
    './nightwatch.js',
    '--config', 'nightwatch.conf.js',
    '--env', env
    ],
    {stdio: 'inherit'}  // pipe nightwatch messages to parent stdio
  );
} else { // use this for linux or mac systems
  child = spawn('chmod', [
    'a+x', 'nightwatch', './bin/webdrivers/linux/chromedriver',
    './bin/webdrivers/mac/chromedriver'
    ]
  );
  child.on('close', function() {
    var env = (process.env.REST_KEY)? 'BDD_TRAVIS,TDD': 'BDD,TDD';
    var child1 = spawn('node', [
      'nightwatch',
      '--config', 'nightwatch.conf.js',
      '--env', env
      ],
      {stdio: 'inherit'}  // Same here. Pipe nightwatch output to parent process
    );
  });
}
