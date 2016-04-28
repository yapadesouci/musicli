'use strict';

const Promise = require('bluebird');
const jsdom = require('jsdom');
const BASE_URI = 'https://www.song365.biz';

class Song365 {

  static refresh(leaves) {
    Promise.map(leaves, leaf => {
      console.log(leaf);
      jsdom.env(
        BASE_URI + '/search/artist?keyword=' + encodeURI(leaf),
        ['http://code.jquery.com/jquery-2.2.2.js'],
        function (err, window) {
          if (err) {
            return Promise.reject(new Error(err));
          } else {
            var $ = window.jQuery;

            var nodes = $('.search-container .search-artist .list .item em.artist-name a');
            if (nodes.length > 0) {
              var node = nodes[0];
              return $(node).attr('href').replace('artist', 'artist/tracks');
            } else {
              return '';
            }
          }
        }
      );
    }).then(track => {
      return track + "&";
    }).then(track => {
      console.log(track);
    });
  }
}

module.exports.Song365 = Song365;
