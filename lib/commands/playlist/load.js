'use strict';

const chalk = require('chalk');
const Playlist = require('./../../playlist').Playlist;

module.exports = app => {
  app
    .vorpal
    .command('load <name>', 'Load playlist <name>')
    .action((args, cb) => {
      const playlist = JSON.parse(app.localStorage.getItem(args.name));

      if (!playlist) {
        app.vorpal.log(chalk.red('Unknown playlist...'));
        cb();
        return;
      }

      app.playlist = new Playlist(playlist);
      app.vorpal.log(chalk.green(`Playlist ${args.name} successfully loaded!`));
      cb();
    });
};
