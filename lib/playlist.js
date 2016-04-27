'use strict';

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
}

module.exports.Playlist = Playlist;
