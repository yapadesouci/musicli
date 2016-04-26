'use strict';

const Echonest = require('echonestjs');
const Playlist = require('./playlist');

module.exports = vorpal => {
  vorpal
    .command('test <name>', 'Test vorpal...')
    .action(function (args, cb) {
      vorpal.log(args);
      vorpal.log('Im a test...');
      cb();
    });
};
