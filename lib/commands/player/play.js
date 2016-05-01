'use strict';


module.exports = app => {
  app
    .vorpal
    .command('play', 'Play song in playlist.')
    .action(function (args, cb) {
      if (!app.playlist) {
        app.vorpal.log('no playlist loaded...');
        cb();
        return;
      }
      
      const songs = app.playlist.tracks[Math.floor(Math.random() * app.playlist.tracks.length)];
      const song = songs[Math.floor(Math.random() * songs.length)];
      app.player.openFile(song);
      cb();
    });
};
