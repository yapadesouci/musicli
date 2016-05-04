'use strict';

const http = require('http');
const https = require('https');
const App = require('./app').App;

http.globalAgent.maxSockets = 2;
https.globalAgent.maxSockets = 2;

const app = new App();
app.run();
