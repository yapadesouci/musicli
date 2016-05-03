'use strict';

module.exports = app => {
  app
    .vorpal
    .command('play', 'Play song in playlist.')
    .action((args, cb) => {
      if (!app.playlist) {
        app.vorpal.log('no playlist loaded...');
        cb();
        return;
      }

      app.player.openFile(app.playlist.fetchRandomSong());
      cb();
    });
};
