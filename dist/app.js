'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = require('chalk');
var vorpal = require('vorpal');
var MPlayer = require('mplayer');
var Spinner = require('./spinner').Spinner;
var LocalStorage = require('node-localstorage').LocalStorage;

var App = function () {
  function App() {
    var _this = this;

    _classCallCheck(this, App);

    this.lastFetchRandomSong = new Date().getTime();
    this.localStorage = new LocalStorage((process.env.HOME || process.env.USERPROFILE) + '/.musicli');
    this.vorpal = vorpal();
    this.vorpal.delimiter('musicli>');

    this.player = new MPlayer();
    this.player.on('status', function (data) {
      if (data.filename) {
        var re = /http:\/\/.*\/(.*)_.*.mp3/gi;
        var m = void 0;

        if ((m = re.exec(data.filename)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }

          var song = decodeURI(m[1]);

          _this.vorpal.log(chalk.green('Now playing: ' + song));
        }
      }
    });
    this.player.on('stop', function () {
      var that = _this;

      _this.playlist.fetchRandomSong().then(function (songUri) {
        that.player.openFile(songUri);
      });
    });
    this.player.on('error', function (error) {
      _this.vorpal.log(chalk.red('Error: ' + error));
    });
    this.spinner = new Spinner(this.vorpal);

    require('./commands/artist/search')(this);

    require('./commands/playlist/all')(this);
    require('./commands/playlist/create')(this);
    require('./commands/playlist/load')(this);
    require('./commands/playlist/delete')(this);
    require('./commands/playlist/current')(this);
    require('./commands/playlist/leaves')(this);
    require('./commands/playlist/remove')(this);
    require('./commands/playlist/refresh')(this);

    require('./commands/player/play')(this);
    require('./commands/player/next')(this);
    require('./commands/player/pause')(this);
  }

  _createClass(App, [{
    key: 'run',
    value: function run() {
      this.vorpal.show();
    }
  }]);

  return App;
}();

module.exports.App = App;