'use strict';

const Promise = require('bluebird');
const Echonest = Promise.promisifyAll(require('echonestjs'));
const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('similar', 'Search similar artists based on the current playlist.')
    .action((args, cb) => {
      if (!app.playlist) {
        app.vorpal.log(chalk.red('No playlist loaded...'));
        cb();
        return;
      }

      const apikey = app.vorpal.localStorage.getItem('echonest');
      if (!apikey) {
        app.vorpal.log(chalk.red('No Echonest apikey registered...'));
        cb();
        return;
      }

      Echonest.init(apikey);

      app.vorpal.ui.prompt([{
        type: 'checkbox',
        name: 'leaves',
        message: 'Which one do you want?',
        choices: app.playlist.leaves
      }], result => {
        Promise.map(result.leaves, leaf => {
          return Echonest.getAsync('artist/similar', {name: leaf, results: 3})
            .then(result => {
              return result.response.artists;
            });
        }).then(results => {
          const leaves = [];
          results.forEach(result => {
            if (result.length > 0) {
              const artists = [];
              result.forEach(artist => {
                artists.push(artist.name);
              });
              leaves.push(artists);
            }
          });
          return leaves;
        }).then(leaves => {
          console.log(leaves);
          const prompt = [];
          leaves.forEach((leaf, index) => {
            prompt.push({
              type: 'checkbox',
              name: `${index}`,
              message: 'Which one do you want?',
              choices: leaf
            });
          });
          app.vorpal.ui.prompt(prompt, result => {
            Object.keys(result).forEach(key => {
              if (result[key] !== 0) {
                const artists = result[key];

                app.playlist.addLeaves(artists);
                app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
                app.vorpal.log(chalk.green(`${artists.join(', ')} successfully added!`));
              }
            });

            app.vorpal.log(chalk.yellow(`Don't forget to refresh!`));
            cb();
          });
        }).catch(error => {
          return Promise.reject(new Error(error));
        });
      });
    });
};

