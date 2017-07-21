'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('next', 'Next song.')
    .action((args, cb) => {
      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      app.playlist.fetchRandomSong().then(songUri => {
        if (!songUri) {
          app.vorpal.log(chalk.red('No song found...'));
          cb();
          return;
        }

        app.player.openFile(songUri);
        cb();
      });
    });
};
