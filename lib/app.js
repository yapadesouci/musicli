'use strict';

const os = require('os');
const vorpal = require('vorpal');
const MPlayer = require('mplayer');

class App {

  constructor() {
    console.log(os.tmpdir());

    this.vorpal = vorpal();
    this.vorpal
      .localStorage('musicli')
      .delimiter('musicli>');

    this.player = new MPlayer();
    this.player.on('stop', () => {
      this.player.openFile(this.playlist.fetchRandomSong());
    });

    require('./commands/artist/init')(this);
    require('./commands/artist/search')(this);
    // require('./commands/artist/similar')(this);

    require('./commands/playlist/all')(this);
    require('./commands/playlist/create')(this);
    require('./commands/playlist/load')(this);
    require('./commands/playlist/delete')(this);
    require('./commands/playlist/current')(this);
    require('./commands/playlist/leaves')(this);
    require('./commands/playlist/remove')(this);
    require('./commands/playlist/refresh')(this);

    require('./commands/player/play')(this);
    require('./commands/player/next')(this);
    require('./commands/player/pause')(this);
  }

  run() {
    this.vorpal.show();
  }
}

module.exports.App = App;
