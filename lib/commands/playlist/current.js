'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('current', 'Log current playlist')
    .hidden()
    .action((args, cb) => {
      if (app.playlist) {
        app.vorpal.log(JSON.stringify(app.playlist));
      } else {
        app.vorpal.log(chalk.red('No playlist loaded...'));
      }
      cb();
    });
};
