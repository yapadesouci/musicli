'use strict';

var chalk = require('chalk');
var Spotify = require('spotify');

module.exports = function (app) {
  app.vorpal.command('search <artist...>', 'Search an artist.').action(function (args, cb) {
    var search = args.artist.join(' ');

    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    Spotify.search({
      type: 'artist',
      query: search
    }, function (error, result) {
      if (error) {
        app.vorpal.log(error);
        cb();
        return;
      }

      var artists = result.artists.items.slice(0, 5).map(function (item) {
        return item.name;
      }) || [];

      if (artists.length === 0) {
        app.vorpal.log(chalk.yellow('No artist found...'));
        cb();
        return;
      }

      app.vorpal.ui.prompt([{
        type: 'checkbox',
        name: 'leaves',
        message: 'Which one do you want?',
        choices: artists
      }], function (artists) {
        if (artists.leaves.length === 0) {
          app.vorpal.log(chalk.yellow('No artist selected...'));
          cb();
          return;
        }

        app.playlist.addLeaves(artists.leaves);
        app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
        app.vorpal.log(chalk.green(artists.leaves.join(', ') + ' successfully added!'));
        cb();
      });
    });
  });
};