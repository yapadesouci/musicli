'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('leaves [name]', 'Show playlist leaves.')
    .action((args, cb) => {
      if (!app.playlist && !args.name) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
      } else if (args.name) {
        const playlist = JSON.parse(app.vorpal.localStorage.getItem(args.name));
        if (playlist) {
          if (playlist.leaves.length === 0) {
            app.vorpal.log(chalk.yellow('No leaves found...'));
          } else {
            app.vorpal.log(chalk.green(`Leaves: ${playlist.leaves.join(', ')}`));
          }
        } else {
          app.vorpal.log(chalk.red('Unknown playlist...'));
        }
      } else if (app.playlist.leaves === 0) {
        app.vorpal.log(chalk.yellow('No leaves found...'));
      } else {
        app.vorpal.log(chalk.green(`Leaves: ${app.playlist.leaves.join(', ')}`));
      }
      cb();
    });
};
