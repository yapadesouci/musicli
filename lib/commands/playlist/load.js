'use strict';

const Playlist = require('./../../playlist').Playlist;

module.exports = app => {
  app
    .vorpal
    .command('load <name>', 'Load playlist <name>')
    .action((args, cb) => {
      const playlist = JSON.parse(app.vorpal.localStorage.getItem(args.name));

      if (playlist) {
        app.playlist = new Playlist(playlist);
      } else {
        app.vorpal.log('unknown playlist...');
      }
      cb();
    });
};
