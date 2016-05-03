'use strict';

const chalk = require('chalk');
const Echonest = require('echonestjs');

module.exports = app => {
  app
    .vorpal
    .command('search <artist...>', 'Search an artist.')
    .action(function (args, cb) {
      const search = args.artist.join(' ');

      if (!app.playlist) {
        app.vorpal.log('no playlist loaded...');
        cb();
        return;
      }

      const apikey = app.vorpal.localStorage.getItem('echonest');
      if (!apikey) {
        app.vorpal.log('no echonest apikey registered...');
        cb();
        return;
      }

      Echonest.init(apikey);
      Echonest.get('artist/search', {name: search, fuzzy_match: true}, (error, result) => { /* eslint camelcase: "off" */
        if (error) {
          app.vorpal.log(error);
          cb();
          return;
        }

        const artists = result.response.artists;
        if (!artists) {
          app.vorpal.log('no artist found...');
          cb();
          return;
        }

        this.prompt([{
          type: 'checkbox',
          name: 'leaves',
          message: `${chalk.green('?')}  Which one do you want? `,
          choices: artists
        }], artists => {
          app.vorpal.log(artists);
          app.playlist.addLeaves(artists.leaves);
          app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
          cb();
        });
      });
    });
};
