const os = require('os');
const spawn = require('child_process').spawn;
var child;

if(os.platform() === 'win32') {
  child = spawn('node', [
    './nightwatch.js',
    '--config', 'nightwatch.conf.js',
    '--env', 'BDD,TDD'
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
    var child1 = spawn('node', [
      'nightwatch',
      '--config', 'nightwatch.conf.js',
      '--env', 'BDD,TDD'
      ],
      {stdio: 'inherit'}  // Same here. Pipe nightwatch output to parent process
    );
  });
}
