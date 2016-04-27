'use strict';

const Playlist = require('./../../playlist').Playlist;

module.exports = app => {
  app
    .vorpal
    .command('create <name>', 'Create a playlist.')
    .action(function (args, cb) {
      const playlist = new Playlist(args.name);
      app.vorpal.localStorage.setItem(args.name, JSON.stringify(playlist));
      cb();
    });
};
