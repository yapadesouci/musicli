'use strict';

module.exports = (vorpal, app) => {
  vorpal
    .command('delete <name>', 'Delete playlist <name>')
    .action(function (args, cb) {
      if (app.playlist && app.playlist.name === args.name) {
        vorpal.log('unload playlist...');
        app.playlist = undefined;
      }

      vorpal.localStorage.removeItem(args.name);
      cb();
    });
};
