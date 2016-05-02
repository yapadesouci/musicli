'use strict';

module.exports = app => {
  app
    .vorpal
    .command('refresh', 'Refresh playlist links.')
    .action(function (args, cb) {
      if (!app.playlist) {
        app.vorpal.log("no playlist loaded...");
        cb();
        return;
      }

      app.playlist.refresh()
        .then(streams => {
          app.playlist.tracks = streams;
          app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
          cb();
        });
    });
};
