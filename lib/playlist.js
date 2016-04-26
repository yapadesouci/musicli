'use strict';

class Playlist {

  constructor(name) {
    this.name = name;
    this.leaves = [];
    this.tracks = [];
  }
}

module.exports.Playlist = Playlist;
