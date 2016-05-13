'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('next', 'Next song.').action(function (args, cb) {
    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    app.player.openFile(app.playlist.fetchRandomSong());
    cb();
  });
};