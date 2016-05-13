'use strict';

var chalk = require('chalk');
var Echonest = require('echonestjs');

module.exports = function (app) {
  app.vorpal.command('search <artist...>', 'Search an artist.').action(function (args, cb) {
    var search = args.artist.join(' ');

    if (!app.playlist) {
      app.vorpal.log(chalk.red('No playlist loaded...'));
      cb();
      return;
    }

    var apikey = app.vorpal.localStorage.getItem('echonest');
    if (!apikey) {
      app.vorpal.log(chalk.red('No Echonest apikey registered...'));
      cb();
      return;
    }

    Echonest.init(apikey);
    Echonest.get('artist/search', { name: search, fuzzy_match: true }, function (error, result) {
      /* eslint camelcase: "off" */
      if (error) {
        app.vorpal.log(error);
        cb();
        return;
      }

      var artists = result.response.artists || [];
      if (artists.length === 0) {
        app.vorpal.log(chalk.yellow('No artist found...'));
        cb();
        return;
      }

      undefined.prompt([{
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