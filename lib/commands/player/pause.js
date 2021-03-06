'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('pause', 'Pause song.')
    .action((args, cb) => {
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
