'use strict';

const os = require('os');
const chalk = require('chalk');
const vorpal = require('vorpal');
const MPlayer = require('mplayer');
const Spinner = require('./spinner').Spinner;

class App {

  constructor() {
    console.log(os.tmpdir());

    this.vorpal = vorpal();
    this.vorpal
      .localStorage('musicli')
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
      this.player.openFile(this.playlist.fetchRandomSong());
    });
    this.player.on('error', error => {
      this.vorpal.log(chalk.red(`Error: ${error}`));
    });
    this.spinner = new Spinner(this.vorpal);

    require('./commands/artist/init')(this);
    require('./commands/artist/search')(this);
    // require('./commands/artist/similar')(this);

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
