'use strict';

var chalk = require('chalk');
var Playlist = require('./../../playlist').Playlist;

module.exports = function (app) {
  app.vorpal.command('load <name>', 'Load playlist <name>').action(function (args, cb) {
    var playlist = JSON.parse(app.localStorage.getItem(args.name));

    if (!playlist) {
      app.vorpal.log(chalk.red('Unknown playlist...'));
      cb();
      return;
    }

    app.playlist = new Playlist(playlist);
    app.vorpal.log(chalk.green('Playlist ' + args.name + ' successfully loaded!'));
    cb();
  });
};