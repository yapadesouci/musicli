'use strict';

const request = require('request');
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

  fetchRandomSong(callback) {
    if (!this.checkSongExist()) {
      callback(null, undefined);
      return;
    }

    let songUri;
    do {
      const songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
      songUri = songs[Math.floor(Math.random() * songs.length)];
    } while (!songUri);

    request(songUri, (err, response) => {
      if (!err && response.statusCode === 200) {
        callback(null, songUri);
      } else {
        this.fetchRandomSong(callback);
      }
    });
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
