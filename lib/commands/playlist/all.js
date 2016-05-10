'use strict';

const os = require('os');
const fs = require('fs');

module.exports = app => {
  app
    .vorpal
    .command('all', 'List all playlist created.')
    .action((args, cb) => {
      const files = fs.readdirSync(`${os.tmpdir()}/.local_storage_musicli`);
      app.vorpal.log(files.filter(file => {
        return file !== 'echonest';
      }));
      cb();
    });
};
