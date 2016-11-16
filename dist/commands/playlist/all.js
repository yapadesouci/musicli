'use strict';

var fs = require('fs');
var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('all', 'List all playlist created.').action(function (args, cb) {
    var files = fs.readdirSync((process.env.HOME || process.env.USERPROFILE) + '/.musicli');
    files = files.filter(function (file) {
      return file !== 'echonest';
    });

    if (files.length === 0) {
      app.vorpal.log(chalk.yellow('You have no playlist registered.'));
      cb();
    }

    app.vorpal.log(chalk.green('Playlist registered: ' + files.join(', ')));
    cb();
  });
};