'use strict';

const App = require('./app').App;

const app = new App();
app.run();

process.on('uncaughtException', err => {
  console.log(`caught exception: ${err}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`unhandled rejection at promise: ${p} reason: ${reason}`);
});
