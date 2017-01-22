'use strict';

var chalk = require('chalk');
var Playlist = require('./../../playlist').Playlist;

module.exports = function (app) {
  app.vorpal.command('create <name>', 'Create a playlist.').action(function (args, cb) {
    var playlist = new Playlist({
      name: args.name
    });

    app.localStorage.setItem(args.name, JSON.stringify(playlist));
    app.vorpal.log(chalk.green('Playlist \'' + args.name + '\' created.'));
    cb();
  });
};