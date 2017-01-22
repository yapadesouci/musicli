'use strict';

const deasync = require('deasync');
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

  fetchRandomSong() {
    if (!this.checkSongExist()) {
      return undefined;
    }

    const songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
    const songUri = songs[Math.floor(Math.random() * songs.length)];

    if (!this.checkStreamExist(songUri)) {
      return this.fetchRandomSong();
    }

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

  checkStreamExist(streamUri) {
    let ret;

    request.get(streamUri, (err, response) => {
      ret = !err && response.statusCode === 200;
    });
    while (ret === undefined) {
      deasync.sleep(100);
    }

    return ret;
  }
}

module.exports.Playlist = Playlist;
