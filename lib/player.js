'use strict';

const MPlayer = require('mplayer');

class Player {

  constructor(app) {
    this._app = app;
    this.player = new MPlayer();
    this.player.on('status', status => {
      if (!status.playing) {
        play();
      }
    });
  }

  play() {
    this.player.openFile(this._app.playlist.tracks[0][0]);
  }
}

module.exports.Player = Player;
