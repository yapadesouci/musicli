'use strict';

var Promise = require('bluebird');
var Echonest = Promise.promisifyAll(require('echonestjs'));
var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('similar', 'Search similar artists based on the current playlist.').action(function (args, cb) {
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

    app.vorpal.ui.prompt([{
      type: 'checkbox',
      name: 'leaves',
      message: 'Which one do you want?',
      choices: app.playlist.leaves
    }], function (result) {
      Promise.map(result.leaves, function (leaf) {
        return Echonest.getAsync('artist/similar', { name: leaf, results: 3 }).then(function (result) {
          return result.response.artists;
        });
      }).then(function (results) {
        var leaves = [];
        results.forEach(function (result) {
          if (result.length > 0) {
            (function () {
              var artists = [];
              result.forEach(function (artist) {
                artists.push(artist.name);
              });
              leaves.push(artists);
            })();
          }
        });
        return leaves;
      }).then(function (leaves) {
        console.log(leaves);
        var prompt = [];
        leaves.forEach(function (leaf, index) {
          prompt.push({
            type: 'checkbox',
            name: '' + index,
            message: 'Which one do you want?',
            choices: leaf
          });
        });
        app.vorpal.ui.prompt(prompt, function (result) {
          Object.keys(result).forEach(function (key) {
            if (result[key] !== 0) {
              var artists = result[key];

              app.playlist.addLeaves(artists);
              app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
              app.vorpal.log(chalk.green(artists.join(', ') + ' successfully added!'));
            }
          });

          app.vorpal.log(chalk.yellow('Don\'t forget to refresh!'));
          cb();
        });
      }).catch(function (error) {
        return Promise.reject(new Error(error));
      });
    });
  });
};