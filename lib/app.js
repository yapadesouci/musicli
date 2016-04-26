'use strict';

const Vorpal = require('vorpal');

export class App {

  constructor() {
    this.vorpal = Vorpal();
    this.vorpal.localStorage('musicli');

    vorpal.localStorage('musicli');

    require('./commands/artist/init')(this.vorpal);
    /*
     require('./commands/artist/search')(vorpal);
     require('./commands/player/play')(vorpal);
     require('./commands/player/next')(vorpal);
     require('./commands/player/stop')(vorpal);
     require('./commands/playlist/load')(vorpal);
     require('./commands/playlist/create')(vorpal);
     require('./commands/playlist/delete')(vorpal);
     require('./commands/playlist/refresh')(vorpal);
     require('./commands/playlist/leaves')(vorpal);
     */


    this.vorpal.delimiter('musicli>');
  }

  run() {
    this.vorpal.show();
  }
}
