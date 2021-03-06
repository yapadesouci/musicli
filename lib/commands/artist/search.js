'use strict';

const chalk = require('chalk');
const Deezer = require('deezer-node-api');

module.exports = app => {
  app
    .vorpal
    .command('search <artist...>', 'Search an artist.')
    .action((args, cb) => {
      const search = args.artist.join(' ');

      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      const deezer = new Deezer();

      deezer.findArtists(search).then(result => {
        const artists = result.data
            .slice(0, 5)
            .map(item => {
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
        }], artists => {
          if (artists.leaves.length === 0) {
            app.vorpal.log(chalk.yellow('No artist selected...'));
            cb();
            return;
          }

          app.playlist.addLeaves(artists.leaves);
          app.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
          app.vorpal.log(chalk.green(`${artists.leaves.join(', ')} successfully added!`));
          cb();
        });
      });
    });
};
