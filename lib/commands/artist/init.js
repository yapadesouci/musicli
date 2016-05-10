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
        message: 'Enter your Echonest apikey?'
      }], result => {
        app.vorpal.localStorage.setItem('echonest', result.apikey);
        app.vorpal.log(chalk.green(`Your Echonest apikey has been successfully saved!`));
        cb();
      });
    });
};

