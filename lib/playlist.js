'use strict';

const superagent = require('superagent');
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

  async fetchRandomSong() {
    if (!this.checkSongExist()) {
      return undefined;
    }

    let songUri;
    do {
      try {
        const songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
        songUri = songs[Math.floor(Math.random() * songs.length)];
        await superagent.get(songUri); // eslint-disable-line no-unused-expressions
      } catch (err) {
        songUri = undefined;
      }
    } while (!songUri);

    return songUri;
  }

  checkSongExist() {
    let result = false;

    this.tracks.forEach(artist => {
      if (artist.length > 0) {
        result = true;
      }
    });

    return result;
  }
}

module.exports.Playlist = Playlist;
