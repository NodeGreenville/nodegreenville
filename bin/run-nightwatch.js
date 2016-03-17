const os = require('os');
const spawn = require('child_process').spawn;
var child;

if(os.platform() === 'win32') {
  child = spawn('node', [
    './nightwatch.js',
    '--group', 'tests/BDD',
    '--config', 'nightwatch.conf.js'
    ],
    {stdio: 'inherit'}  // pipe nightwatch messages to parent stdio
  );
} else { // use this for linux or mac systems
  child = spawn('chmod', [
    'a+x', 'nightwatch', './bin/webdrivers/linux/chromedriver'
    ]
  );
  child.on('close', function() {
    var child1 = spawn('node', [
      'nightwatch',
      '--group', 'tests/BDD',
      '--config', 'nightwatch.conf.js'
      ],
      {stdio: 'inherit'}  // Same here. Pipe nightwatch output to parent process
    );
  });
}
