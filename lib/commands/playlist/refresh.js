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
        .then(results => {
          let stream = [];
          for (let i = 0; i < results.length; i++) {
            if (results[i].length > 0) {
              stream.push([]);

              for (let j = 0; j < results[i].length; j++) {
                if (results[i][j]) {
                  stream[i].push(results[i][j]);
                }
              }
            }
          }
          return stream;
        })
        .then(streams => {
          app.playlist.tracks = streams;
          app.vorpal.localStorage.setItem(app.playlist.name, JSON.stringify(app.playlist));
          cb();
        });
    });
};
