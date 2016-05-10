'use strict';

const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

module.exports = app => {
  app
    .vorpal
    .command('delete <name>', 'Delete playlist <name>')
    .action((args, cb) => {
      const files = fs.readdirSync(`${os.tmpdir()}/.local_storage_musicli`);
      if (args.name === 'echonest' || files.indexOf(args.name) === -1) {
        app.vorpal.log(chalk.red('Unknown playlist...'));
        cb();
        return;
      }

      if (app.playlist && app.playlist.name === args.name) {
        app.player.stop();
        app.vorpal.log('Unload playlist...');
        app.playlist = undefined;
      }

      app.vorpal.localStorage.removeItem(args.name);
      app.vorpal.log(chalk.green(`Playlist ${args.name} deleted!`));
      cb();
    });
};
