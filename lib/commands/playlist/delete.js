'use strict';

module.exports = app => {
  app
    .vorpal
    .command('delete <name>', 'Delete playlist <name>')
    .action((args, cb) => {
      if (app.playlist && app.playlist.name === args.name) {
        app.vorpal.log('unload playlist...');
        app.playlist = undefined;
      }

      app.vorpal.localStorage.removeItem(args.name);
      cb();
    });
};
