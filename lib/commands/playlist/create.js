'use strict';

const chalk = require('chalk');
const Playlist = require('./../../playlist').Playlist;

module.exports = app => {
  app
    .vorpal
    .command('create <name>', 'Create a playlist.')
    .validate(args => {
      if (args.name === 'echonest') {
        app.vorpal.log(chalk.red(`You can't choose 'echonest' as playlist's name.`));
        return false;
      }

      return true;
    })
    .action((args, cb) => {
      const playlist = new Playlist({
        name: args.name
      });

      app.vorpal.localStorage.setItem(args.name, JSON.stringify(playlist));
      app.vorpal.log(chalk.green(`Playlist '${args.name}' created.`));
      cb();
    });
};
