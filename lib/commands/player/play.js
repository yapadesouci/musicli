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

      const song = app.playlist.fetchRandomSong();
      if (!song) {
        app.vorpal.log(chalk.red('No song found...'));
        cb();
        return;
      }

      app.player.openFile(song);
      cb();
    });
};
