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
    artists.forEach(artist => {
      const index = this.leaves.indexOf(artist);
      if (index === -1) {
        this.leaves.push(artist);
      }
    });
  }

  removeLeaves(artists) {
    artists.forEach(artist => {
      const index = this.leaves.indexOf(artist);
      if (index !== -1) {
        this.leaves.splice(index, 1);
        this.tracks.splice(index, 1);
      }
    });
  }

  refresh() {
    return Song365.refresh(this.leaves);
  }

  fetchRandomSong() {
    if (!this.checkSongExist()) {
      return undefined;
    }

    const songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
    return songs[Math.floor(Math.random() * songs.length)];
  }

  checkSongExist() {
    this.tracks.forEach(artist => {
      if (this.tracks[artist] && this.tracks[artist].length >= 0) {
        return true;
      }
    });

    return false;
  }
}

module.exports.Playlist = Playlist;
