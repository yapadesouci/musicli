'use strict';

module.exports = app => {
  app
    .vorpal
    .command('pause', 'Pause song.')
    .action((args, cb) => {
      app.player.pause();
      cb();
    });
};
