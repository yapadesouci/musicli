'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('pause', 'Pause song.').action(function (args, cb) {
    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    app.player.isPaused = true;
    app.player.pause();
    cb();
  });
};