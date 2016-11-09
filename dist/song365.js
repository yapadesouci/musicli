'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var jsdom = Promise.promisifyAll(require('jsdom'));

var BASE_URI = 'https://www.yourmusics.live';

var Song365 = function () {
  function Song365() {
    _classCallCheck(this, Song365);
  }

  _createClass(Song365, [{
    key: 'fetchTracksURI',
    value: function fetchTracksURI(leaves) {
      return Promise.map(leaves, function (leaf) {
        return jsdom.envAsync(BASE_URI + '/search/artist?keyword=' + encodeURI(leaf), ['http://code.jquery.com/jquery.js']).then(function (window) {
          var $ = window.jQuery;

          var nodes = $('.search-container .search-artist .list .item em.artist-name a');
          if (nodes.length > 0) {
            var node = nodes[0];
            return $(node).attr('href').replace('artist', 'artist/tracks');
          }

          return '';
        });
      }).then(function (results) {
        return results;
      });
    }
  }, {
    key: 'fetchSongsURI',
    value: function fetchSongsURI(tracks) {
      return Promise.map(tracks, function (track) {
        return jsdom.envAsync(BASE_URI + track, ['http://code.jquery.com/jquery.js']).then(function (window) {
          var $ = window.jQuery;

          var tracks = [];
          $('.artist-songs .list .item div.buttons a.play').each(function () {
            var track = BASE_URI + $(this).attr('href').replace('track', 'download');
            tracks.push(track);
          });

          return tracks;
        });
      }).then(function (results) {
        return results;
      });
    }
  }, {
    key: 'fetchStreamsURI',
    value: function fetchStreamsURI(songs) {
      return Promise.map(songs, function (song) {
        return Promise.map(song, function (dl) {
          return request.getAsync(encodeURI(dl)).then(function (html) {
            var re = /var hqurl = '(.*)'/gi;
            var m = void 0;

            if ((m = re.exec(html.body)) !== null) {
              if (m.index === re.lastIndex) {
                re.lastIndex++;
              }

              return m[1];
            }
          });
        });
      }).then(function (results) {
        var stream = [];
        for (var i = 0; i < results.length; i++) {
          if (results[i].length > 0) {
            stream.push([]);

            for (var j = 0; j < results[i].length; j++) {
              if (results[i][j]) {
                stream[i].push(results[i][j]);
              }
            }
          }
        }
        return stream;
      });
    }
  }, {
    key: 'refresh',
    value: function refresh(leaves) {
      return this.fetchTracksURI(leaves).then(this.fetchSongsURI).then(this.fetchStreamsURI).catch(function (e) {
        return Promise.reject(new Error(e));
      });
    }
  }]);

  return Song365;
}();

module.exports.Song365 = new Song365();