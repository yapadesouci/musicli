'use strict';

const chalk = require('chalk');
const vorpal = require('vorpal');
const MPlayer = require('mplayer');
const Spinner = require('./spinner').Spinner;
const LocalStorage = require('node-localstorage').LocalStorage;

class App {

  constructor() {
    this.lastFetchRandomSong = new Date().getTime();
    this.localStorage = new LocalStorage(`${process.env.HOME || process.env.USERPROFILE}/.musicli`);
    this.vorpal = vorpal();
    this.vorpal
      .delimiter('musicli>');

    this.player = new MPlayer();
    this.player.on('status', data => {
      if (data.filename) {
        const re = /http:\/\/.*\/(.*)_.*.mp3/gi;
        let m;

        if ((m = re.exec(data.filename)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }

          const song = decodeURI(m[1]);

          this.vorpal.log(chalk.green(`Now playing: ${song}`));
        }
      }
    });
    this.player.on('stop', () => {
      if (new Date().getTime() - this.lastFetchRandomSong < 10000) {
        this.vorpal.log(chalk.yellow(`Debug: Ignore fetch random song burst.`));
        return;
      }

      this.lastFetchRandomSong = new Date().getTime();

      const that = this;

      this.playlist.fetchRandomSong((err, response) => {
        if (err) {
          that.vorpal.log(chalk.red(`Error: ${err}`));
        } else {
          that.player.openFile(response);
        }
      });
    });
    this.player.on('error', error => {
      this.vorpal.log(chalk.red(`Error: ${error}`));
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

  run() {
    this.vorpal.show();
  }
}

module.exports.App = App;
