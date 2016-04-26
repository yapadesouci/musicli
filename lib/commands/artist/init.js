'use strict';

const chalk = require('chalk');

module.exports = vorpal => {
  vorpal
    .command('init', 'Initialize your Echonest apikey.')
    .action(function (args, cb) {
      this.prompt([{
        type: 'input',
        name: 'apikey',
        message: chalk.green('?') + ' Enter your Echonest ApiKey? '
      }], function (result) {
        vorpal.localStorage.setItem('echonest', result.apikey);
        cb();
      });
    });
};

