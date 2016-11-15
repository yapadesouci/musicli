'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('refresh', 'Refresh playlist links.').action(function (args, cb) {
    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    app.spinner.start('Search songs. Please wait...');

    app.playlist.refresh().then(function (streams) {
      app.spinner.stop();
      app.playlist.tracks = streams;
      app.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
      app.vorpal.log(chalk.green('Playlist ' + app.playlist.name + ' successfully refreshed!'));
      cb();
    });
  }).cancel(function () {
    app.spinner.stop();
    app.vorpal.log(chalk.yellow('Command cancelled before completion...'));
  });
};