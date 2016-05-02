'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const jsdom = Promise.promisifyAll(require('jsdom'));

const BASE_URI = 'https://www.song365.name';

class Song365 {

  fetchTracksURI(leaves) {
    return Promise.map(leaves, leaf => {
      return jsdom.envAsync(BASE_URI + '/search/artist?keyword=' + encodeURI(leaf), ['http://code.jquery.com/jquery.js'])
        .then(window => {
          var $ = window.jQuery;

          var nodes = $('.search-container .search-artist .list .item em.artist-name a');
          if (nodes.length > 0) {
            var node = nodes[0];
            return $(node).attr('href').replace('artist', 'artist/tracks');
          } else {
            return '';
          }
        });
    }).then(results => {
      console.log(results);
      return results;
    });
  }

  fetchSongsURI(tracks) {
    return Promise.map(tracks, track => {
      return jsdom.envAsync(BASE_URI + track, ['http://code.jquery.com/jquery.js'])
        .then(window => {
          var $ = window.jQuery;

          var tracks = [];
          $('.artist-songs .list .item div.buttons a.play').each(function () {
            var track = BASE_URI + $(this).attr('href').replace('track', 'download');
            tracks.push(track);
          });

          return tracks;
        })
    }).then(results => {
      console.log(results);
      return results;
    });
  }

  fetchStreamsURI(songs) {
    return Promise.map(songs, song => {
      return Promise.map(song, dl => {
        console.log(dl);
        return request.getAsync(encodeURI(dl))
          .then(html => {
            var re = /var hqurl = '(.*)'/gi;
            var m;

            if ((m = re.exec(html.body)) !== null) {
              if (m.index === re.lastIndex) {
                re.lastIndex++;
              }

              return m[1];
            }
          });
      });
    })
    .then(results => {
      let stream = [];
      for (let i = 0; i < results.length; i++) {
        if (results[i].length > 0) {
          stream.push([]);

          for (let j = 0; j < results[i].length; j++) {
            if (results[i][j]) {
              stream[i].push(results[i][j]);
            }
          }
        }
      }
      return stream;
    });
  }

  refresh(leaves) {
    return this.fetchTracksURI(leaves)
      .then(this.fetchSongsURI)
      .then(this.fetchStreamsURI)
      .catch(function (e) {
        return Promise.reject(new Error(e));
      });
  }
}

module.exports.Song365 = new Song365();
