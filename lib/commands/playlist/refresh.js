'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('refresh', 'Refresh playlist links.')
    .action((args, cb) => {
      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      app.playlist.refresh()
        .then(streams => {
          app.playlist.tracks = streams;
          app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
          app.vorpal.log(chalk.green(`Playlist ${app.playlist.name} successfully refreshed!`));
          cb();
        });
    });
};
