'use strict';

var fs = require('fs');
var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('delete <name>', 'Delete playlist <name>').action(function (args, cb) {
    var files = fs.readdirSync((process.env.HOME || process.env.USERPROFILE) + '/.musicli');
    if (files.indexOf(args.name) === -1) {
      app.vorpal.log(chalk.red('Unknown playlist...'));
      cb();
      return;
    }

    if (app.playlist && app.playlist.name === args.name) {
      app.player.stop();
      app.vorpal.log('Unload playlist...');
      app.playlist = undefined;
    }

    app.localStorage.removeItem(args.name);
    app.vorpal.log(chalk.green('Playlist ' + args.name + ' deleted!'));
    cb();
  });
};