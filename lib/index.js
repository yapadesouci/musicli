'use strict';

const App = require('./app').App;

let app = new App();
app.run();

process.on('uncaughtException', function (err) {
  console.log('caught exception: ' + err);
});

process.on('unhandledRejection', function (reason, p) {
  console.log("unhandled rejection at promise: " + p + " reason: " + reason);
});
