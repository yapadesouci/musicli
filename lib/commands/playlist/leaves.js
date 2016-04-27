'use strict';

module.exports = app => {
  app
    .vorpal
    .command('leaves [name]', 'Show playlist leaves.')
    .action(function (args, cb) {
      if (!app.playlist && !args.name) {
        app.vorpal.log('no playlist loaded...');
      } else if (args.name) {
        const playlist = JSON.parse(app.vorpal.localStorage.getItem(args.name));
        if (!playlist) {
          app.vorpal.log('unknown playlist...');
        } else {
          app.vorpal.log(playlist.leaves);
        }
      } else {
        app.vorpal.log(app.playlist.leaves);
      }
      cb();
    });
};
