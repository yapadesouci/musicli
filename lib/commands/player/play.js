'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('play', 'Play song in playlist.')
    .action((args, cb) => {
      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      app.lastFetchRandomSong = new Date().getTime();
      app.playlist.fetchRandomSong((err, response) => {
        if (err) {
          cb();
          return;
        }

        if (!response) {
          app.vorpal.log(chalk.red('No song found...'));
          cb();
          return;
        }

        app.player.openFile(response);
        cb();
      });
    });
};
