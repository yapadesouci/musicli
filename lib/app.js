'use strict';

const Vorpal = require('vorpal');

class App {

  constructor() {
    this.vorpal = Vorpal();
    this.vorpal.localStorage('musicli');

    require('./commands/artist/init')(this.vorpal);
    require('./commands/playlist/create')(this.vorpal);
    require('./commands/playlist/load')(this.vorpal, this);
    require('./commands/playlist/delete')(this.vorpal, this);

    /*
     require('./commands/artist/search')(this.vorpal);
     require('./commands/player/play')(vorpal);
     require('./commands/player/next')(vorpal);
     require('./commands/player/stop')(vorpal);
     require('./commands/playlist/refresh')(vorpal);
     require('./commands/playlist/leaves')(vorpal);
     */

    this.vorpal.delimiter('musicli>');
  }

  run() {
    this.vorpal.show();
  }
}

module.exports.App = App;
