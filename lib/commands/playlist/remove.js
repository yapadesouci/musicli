'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('remove', 'Remove an artist.')
    .action(function (args, cb) {
      if (!app.playlist) {
        app.vorpal.log('no playlist loaded...');
        cb();
        return;
      }

      this.prompt([{
        type: 'checkbox',
        name: 'leaves',
        message: `${chalk.green('?')}  Which one do you want remove? `,
        choices: app.playlist.leaves
      }], artists => {
        app.vorpal.log(artists);
        app.playlist.removeLeaves(artists.leaves);
        app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
        cb();
      });
    });
};
