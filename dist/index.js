#!/usr/bin/env node
'use strict';

var http = require('http');
var https = require('https');
var App = require('./app').App;

http.globalAgent.maxSockets = 6;
https.globalAgent.maxSockets = 6;

var app = new App();
app.run();