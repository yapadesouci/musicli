'use strict';


module.exports = app => {
  app
    .vorpal
    .command('play', 'Play song in playlist.')
    .action(function (args, cb) {
      app.player.play();
      cb();
    });
};
