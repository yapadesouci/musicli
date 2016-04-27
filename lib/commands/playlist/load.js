'use strict';

module.exports = app => {
  app
    .vorpal
    .command('load <name>', 'Load playlist <name>')
    .action(function (args, cb) {
      const playlist = JSON.parse(app.vorpal.localStorage.getItem(args.name));

      if (!playlist) {
        app.vorpal.log('unknown playlist...')
      } else {
        app.playlist = playlist;
      }
      cb();
    });
};
