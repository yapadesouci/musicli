'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('play', 'Play song in playlist.').action(function (args, cb) {
    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    var song = app.playlist.fetchRandomSong();
    if (!song) {
      app.vorpal.log(chalk.red('No song found...'));
      cb();
      return;
    }

    app.player.openFile(song);
    cb();
  });
};