'use strict';

const Playlist = require('./../../playlist').Playlist;

module.exports = vorpal => {
  vorpal
    .command('create <name>', 'Create a playlist.')
    .action(function (args, cb) {
      const name = args.name;

      let playlist = new Playlist(name);
      vorpal.localStorage.setItem(name, playlist);
      cb();
    });
};
