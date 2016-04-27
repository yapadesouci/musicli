'use strict';

module.exports = app => {
  app
    .vorpal
    .command('current', 'Log current playlist')
    .action(function (args, cb) {
      if (app.playlist) {
        app.vorpal.log(JSON.stringify(app.playlist));
      } else {
        app.vorpal.log('no playlist loaded...')
      }
      cb();
    });
};
