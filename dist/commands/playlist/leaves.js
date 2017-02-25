'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('leaves', 'Show leaves.').action(function (args, cb) {
    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
    } else if (app.playlist.leaves === 0) {
      app.vorpal.log(chalk.yellow('No leaves found...'));
    } else {
      var output = 'Leaves: ';
      for (var i = 0; i < app.playlist.leaves.length; i++) {
        output += app.playlist.leaves[i] + ' (' + app.playlist.tracks[i].length + ' songs), ';
      }
      output = output.trim().slice(0, -1) + '.';

      app.vorpal.log(chalk.green(output));
    }
    cb();
  });
};