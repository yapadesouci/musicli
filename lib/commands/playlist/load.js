'use strict';

module.exports = vorpal => {
  vorpal
    .command('test <name>', 'Test vorpal...')
    .action((args, cb) => {
      vorpal.log(args);
      vorpal.log('Im a test...');
      cb();
    });
};
