'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var Song365 = require('./song365').Song365;

var Playlist = function () {
  function Playlist(data) {
    _classCallCheck(this, Playlist);

    this.name = '';
    this.leaves = [];
    this.tracks = [];

    Object.assign(this, data);
  }

  _createClass(Playlist, [{
    key: 'addLeaves',
    value: function addLeaves(artists) {
      var _this = this;

      artists.forEach(function (artist) {
        var index = _this.leaves.indexOf(artist);
        if (index === -1) {
          _this.leaves.push(artist);
        }
      });
    }
  }, {
    key: 'removeLeaves',
    value: function removeLeaves(artists) {
      var _this2 = this;

      artists.forEach(function (artist) {
        var index = _this2.leaves.indexOf(artist);
        if (index !== -1) {
          _this2.leaves.splice(index, 1);
          _this2.tracks.splice(index, 1);
        }
      });
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      return Song365.refresh(this.leaves);
    }
  }, {
    key: 'fetchRandomSong',
    value: function fetchRandomSong(callback) {
      var _this3 = this;

      if (!this.checkSongExist()) {
        callback(null, undefined);
        return;
      }

      var songUri = void 0;
      do {
        var songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
        songUri = songs[Math.floor(Math.random() * songs.length)];
      } while (!songUri);

      request(songUri, function (err, response) {
        if (!err && response.statusCode === 200) {
          callback(null, songUri);
        } else {
          _this3.fetchRandomSong(callback);
        }
      });
    }
  }, {
    key: 'checkSongExist',
    value: function checkSongExist() {
      var result = false;

      this.tracks.forEach(function (artist) {
        if (artist.length > 0) {
          result = true;
        }
      });

      return result;
    }
  }]);

  return Playlist;
}();

module.exports.Playlist = Playlist;