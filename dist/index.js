#!/usr/bin/env node
'use strict';

var http = require('http');
var https = require('https');
var App = require('./app').App;

http.globalAgent.maxSockets = 2;
https.globalAgent.maxSockets = 2;

var app = new App();
app.run();