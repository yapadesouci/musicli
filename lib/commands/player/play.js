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

      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      if (!app.player.isPaused) {
        app.playlist.fetchRandomSong().then(songUri => {
          if (!songUri) {
            app.vorpal.log(chalk.red('No song found...'));
            cb();
            return;
          }

          app.player.openFile(songUri);
        });
      } else {
        app.player.isPaused = false;
        app.player.play();
      }

      cb();
    });
};
