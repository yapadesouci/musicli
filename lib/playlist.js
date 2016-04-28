'use strict';

const Song365 = require('./song365').Song365;

class Playlist {

  constructor(data) {
    this.name = '';
    this.leaves = [];
    this.tracks = [];

    Object.assign(this, data);
  }

  addLeaves(artists) {
    this.leaves.push(...artists);
  }

  refresh() {
    this.tracks = Song365.refresh(this.leaves);
  }
}

module.exports.Playlist = Playlist;
