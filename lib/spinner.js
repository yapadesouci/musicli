'use strict';

class Spinner {

  constructor(vorpal) {
    this.vorpal = vorpal;
    this.pattern = '⠙⠸⠴⠦⠇⠋';
    this.length = this.pattern.length;
    this.frame = 0;
  }

  start(message = '', interval = 250) {
    this.stop();
    this.message = message;
    this.interval = setInterval(() => {
      this.vorpal.ui.redraw.clear();
      this.vorpal.ui.redraw(`${this.pattern[this.frame++ % this.length]} ${message}`);
    }, interval);
  }

  stop() {
    this.vorpal.ui.redraw.clear();
    this.frame = 0;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

module.exports.Spinner = Spinner;
