'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spinner = function () {
  function Spinner(vorpal) {
    _classCallCheck(this, Spinner);

    this.vorpal = vorpal;
    this.pattern = '⠙⠸⠴⠦⠇⠋';
    this.length = this.pattern.length;
    this.frame = 0;
  }

  _createClass(Spinner, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var interval = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];

      this.stop();
      this.message = message;
      this.interval = setInterval(function () {
        _this.vorpal.ui.redraw.clear();
        _this.vorpal.ui.redraw(_this.pattern[_this.frame++ % _this.length] + ' ' + message);
      }, interval);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.vorpal.ui.redraw.clear();
      this.frame = 0;
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }]);

  return Spinner;
}();

module.exports.Spinner = Spinner;