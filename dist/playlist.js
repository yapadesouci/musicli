'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    value: function fetchRandomSong() {
      if (!this.checkSongExist()) {
        return undefined;
      }

      var songs = this.tracks[Math.floor(Math.random() * this.tracks.length)];
      return songs[Math.floor(Math.random() * songs.length)];
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