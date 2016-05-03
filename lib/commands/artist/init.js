'use strict';

const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('init', 'Initialize your Echonest ApiKey.')
    .action(function (args, cb) {
      this.prompt([{
        type: 'input',
        name: 'apikey',
        message: `${chalk.green('?')} Enter your Echonest ApiKey? `
      }], result => {
        app.vorpal.localStorage.setItem('echonest', result.apikey);
        cb();
      });
    });
};

