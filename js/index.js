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

    this.gameState = null; // start, stop, end, reset

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
          }, 250);
          console.log('[VALID] click event');
        } else {
          console.error('[NOT VALID] click event');
        }
      });
    }
  }, {
    key: "increaseScore",
    value: function increaseScore() {
      this.score++;
      console.log('score', this.score);
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
      console.log('timerCount', this.timerCount);

      if (this.timerCount >= this.timeLimit) {
        this.end();
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
      var square = squares[this.randomInteger(0, 8)];
      this.bindEventListener(square);
      square.className = 'active';
      setTimeout(function () {
        _this2.resetSquare(square);
      }, this.randomInteger(500, 1000));
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
    key: "buttonsEnd",
    value: function buttonsEnd() {
      this.buttonsHide();
      this.setDisplayById('#reset', 'inline-block');
    }
  }, {
    key: "buttonsReset",
    value: function buttonsReset() {
      this.buttonsHide();
      this.setDisplayById('#play', 'inline-block');
    }
  }, {
    key: "buttonsStop",
    value: function buttonsStop() {
      this.buttonsHide();
      this.setDisplayById('#play', 'inline-block');
      this.setDisplayById('#reset', 'inline-block');
    }
  }, {
    key: "buttonsStart",
    value: function buttonsStart() {
      this.buttonsHide();
      this.setDisplayById('#stop', 'inline-block');
    }
  }, {
    key: "gameTime",
    value: function gameTime() {
      switch (this.gameState) {
        case 'start':
          this.timeRemaining();
          this.timer = setInterval(this.countDown.bind(this), 1000);
          this.buttonsStart();
          console.log('start');
          break;

        case 'stop':
          clearInterval(this.timer);
          console.log(this.timer);
          this.buttonsStop();
          console.log('stop');
          break;

        case 'end':
          clearInterval(this.timer);
          this.buttonsEnd();
          console.log('end');
          break;

        case 'reset':
          clearInterval(this.timer);
          this.timer = 0;
          this.timerCount = 0;
          this.resetScore();
          this.buttonsReset();
          this.timeRemaining();
          console.log('reset');
          break;

        default:
          this.timeRemaining();
          console.log('setup');
          break;
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      this.gameTime();
    }
  }, {
    key: "setGameState",
    value: function setGameState(state) {
      this.gameState = state;
      this.gameTime();
    }
  }, {
    key: "play",
    value: function play() {
      this.setGameState('start');
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setGameState('stop');
    }
  }, {
    key: "end",
    value: function end() {
      this.setGameState('end');
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setGameState('reset');
    }
  }]);

  return Game;
}();

var wackAMole = new Game({
  debug: true
});