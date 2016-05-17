'use strict';

var chalk = require('chalk');

module.exports = function (app) {
  app.vorpal.command('init', 'Initialize your Echonest ApiKey.').action(function (args, cb) {
    app.vorpal.ui.prompt([{
      type: 'input',
      name: 'apikey',
      message: 'Enter your Echonest apikey? '
    }], function (result) {
      if (result.apikey === '') {
        app.vorpal.log(chalk.red('Apikey can\'t be empty...'));
        cb();
        return;
      }

      app.vorpal.localStorage.setItem('echonest', result.apikey);
      app.vorpal.log(chalk.green('Your Echonest apikey has been successfully saved!'));
      cb();
    });
  });
};