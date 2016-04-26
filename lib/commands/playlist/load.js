'use strict';

module.exports = (vorpal, app) => {
  vorpal
    .command('load <name>', 'Load playlist <name>')
    .action(function (args, cb) {
      let playlist = vorpal.localStorage.getItem(args.name);

      if (!playlist) {
        vorpal.log('Unknown playlist...')
      } else {
        app.playlist = playlist;
      }
      cb();
    });
};
