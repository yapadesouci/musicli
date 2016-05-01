'use strict';

const os = require('os');
const Vorpal = require('vorpal');
const MPlayer = require('mplayer');

class App {

  constructor() {
    console.log(os.tmpdir());

    this.vorpal = Vorpal();
    this.vorpal.localStorage('musicli');

    this.player = new MPlayer();
    this.player.on('stop', () => {
      const songs = this.playlist.tracks[Math.floor(Math.random() * this.playlist.tracks.length)];
      const song = songs[Math.floor(Math.random() * songs.length)];
      this.player.openFile(song);
    });

    require('./commands/artist/init')(this);
    require('./commands/artist/search')(this);

    require('./commands/playlist/create')(this);
    require('./commands/playlist/load')(this);
    require('./commands/playlist/delete')(this);
    require('./commands/playlist/current')(this);
    require('./commands/playlist/leaves')(this);
    require('./commands/playlist/refresh')(this);

    require('./commands/player/play')(this);

    /*
     require('./commands/player/next')(vorpal);
     require('./commands/player/stop')(vorpal);
     */

    this.vorpal.delimiter('musicli>');
  }

  run() {
    this.vorpal.show();
  }
}

module.exports.App = App;
