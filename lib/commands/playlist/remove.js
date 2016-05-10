'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('remove', 'Remove an artist.')
    .action(function (args, cb) {
      if (!app.playlist) {
        app.vorpal.log(chalk.ref('No playlist loaded...'));
        cb();
        return;
      }

      this.prompt([{
        type: 'checkbox',
        name: 'leaves',
        message: 'Which one do you want remove?',
        choices: app.playlist.leaves
      }], artists => {
        if (artists.leaves.length === 0) {
          app.vorpal.log(chalk.yellow('No artist selected...'));
          cb();
          return;
        }

        app.playlist.removeLeaves(artists.leaves);
        app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
        app.vorpal.log(chalk.green(`Artists removed: ${artists.leaves.join(', ')}`));
        cb();
      });
    });
};