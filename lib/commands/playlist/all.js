'use strict';

const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('all', 'List all playlist created.')
    .action((args, cb) => {
      let files = fs.readdirSync(`${os.tmpdir()}/.local_storage_musicli`);
      files = files.filter(file => {
        return file !== 'echonest';
      });

      if (files.length === 0) {
        app.vorpal.log(chalk.yellow('You have no playlist registered.'));
        cb();
      }

      app.vorpal.log(chalk.green(`Playlist registered: ${files.join(', ')}`));
      cb();
    });
};
