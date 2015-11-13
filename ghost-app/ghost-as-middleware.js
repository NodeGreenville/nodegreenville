var ghost = require('ghost');

function processBuffer(requestBuffer, app) {
  while(requestBuffer.length) {
    var request = requestBuffer.pop();
    app(request[0], request[1]);
  }
}

function makeGhostMiddleware(options) {
  var requestBuffer = [];
  var app = false;

  ghost(options).then(function(ghostServer) {
    app = ghostServer.rootApp;
    processBuffer(requestBuffer, app);
  });

  return function handleRequest(request, response) {
    if (!app) {
      requestBuffer.unshift([request, response]);
    } else {
      app(request, response);
    }
  }
}

module.exports = makeGhostMiddleware;
