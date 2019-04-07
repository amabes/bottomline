"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(params) {
    _classCallCheck(this, Game);

    this.timeLimit = 10; // seconds

    this.state = 'reset'; // start, stop, end

    this.timer = 0;
    this.timerCount = 0;
    this.score = 0;
    this.debug = params && params.debug ? params.debug : false;
    this.setup();
  }

  _createClass(Game, [{
    key: "bindEventListener",
    value: function bindEventListener(square) {
      var _this = this;

      var checkMark = '<i class="fas fa-check-circle"></i>';
      square.addEventListener('click', function () {
        if (square.className === 'active' && _this.timer !== 0) {
          square.innerHTML = checkMark;
          square.className = '';

          _this.increaseScore();

          setTimeout(function () {
            square.innerHTML = '';
          }, 150);
          if (_this.debug) console.log('[VALID] click event');
        }
      });
    }
  }, {
    key: "increaseScore",
    value: function increaseScore() {
      this.score++;
      if (this.debug) console.log('score', this.score);
      this.updateScore();
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      this.score = 0;
      this.updateScore();
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      document.querySelector('#score').innerHTML = this.score;
    }
  }, {
    key: "countDown",
    value: function countDown() {
      this.timerCount++;
      if (this.debug) console.log('timerCount', this.timerCount);

      if (this.timerCount >= this.timeLimit) {
        this.setState('end');
      }

      this.timeRemaining();
      this.randomSquare();
    }
  }, {
    key: "randomInteger",
    value: function randomInteger(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  }, {
    key: "resetSquare",
    value: function resetSquare(square) {
      square.className = '';
    }
  }, {
    key: "randomSquare",
    value: function randomSquare() {
      var _this2 = this;

      var squares = document.querySelectorAll('#board .row div');
      var square = squares[this.randomInteger(0, squares.length - 1)];
      this.bindEventListener(square);
      square.className = 'active';
      setTimeout(function () {
        _this2.resetSquare(square);
      }, this.randomInteger(500, 1500));
    }
  }, {
    key: "timeRemaining",
    value: function timeRemaining() {
      document.querySelector('#count-down').innerHTML = this.timeLimit - this.timerCount;
    }
  }, {
    key: "setDisplayById",
    value: function setDisplayById(id, styleProp) {
      document.querySelector(id).style.display = styleProp;
    }
  }, {
    key: "buttonsHide",
    value: function buttonsHide() {
      var btns = document.querySelectorAll('.btn');
      Object.values(btns).forEach(function (btn) {
        btn.style.display = 'none';
      });
    }
  }, {
    key: "buttons",
    value: function buttons() {
      this.buttonsHide();

      switch (this.state) {
        case 'start':
          return this.setDisplayById('#stop', 'inline-block');
          break;

        case 'stop':
          this.setDisplayById('#start', 'inline-block');
          this.setDisplayById('#reset', 'inline-block');
          break;

        case 'end':
          return this.setDisplayById('#reset', 'inline-block');

        case 'reset':
          return this.setDisplayById('#start', 'inline-block');

        default:
          break;
      }
    }
  }, {
    key: "gameTime",
    value: function gameTime() {
      if (this.debug) console.log('state', this.state);
      this.buttons();

      switch (this.state) {
        case 'start':
          this.timeRemaining();
          this.timer = setInterval(this.countDown.bind(this), 1000);
          break;

        case 'stop':
          clearInterval(this.timer);
          if (this.debug) console.log('timer', this.timer);
          break;

        case 'end':
          return clearInterval(this.timer);

        case 'reset':
          clearInterval(this.timer);
          this.timer = 0;
          this.timerCount = 0;
          this.resetScore();
          this.timeRemaining();
          break;

        default:
          return this.timeRemaining();
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this3 = this;

      this.gameTime();
      document.querySelector('#start').addEventListener('click', function () {
        _this3.setState('start');
      });
      document.querySelector('#stop').addEventListener('click', function () {
        _this3.setState('stop');
      });
      document.querySelector('#reset').addEventListener('click', function () {
        _this3.setState('reset');
      });
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.state = state;
      this.gameTime();
    }
  }]);

  return Game;
}();

var wackAMole = new Game();