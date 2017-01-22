'use strict';

const chalk = require('chalk');
const Playlist = require('./../../playlist').Playlist;

module.exports = app => {
  app
    .vorpal
    .command('create <name>', 'Create a playlist.')
    .action((args, cb) => {
      const playlist = new Playlist({
        name: args.name
      });

      app.localStorage.setItem(args.name, JSON.stringify(playlist));
      app.vorpal.log(chalk.green(`Playlist '${args.name}' created.`));
      cb();
    });
};
