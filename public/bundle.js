(function () {
  'use strict';

  function setDisplayById(id, styleProp) {
    document.querySelector(id).style.display = styleProp;
  }

  function updateScore(score) {
    document.querySelector('#score').innerHTML = score;
  }

  function randomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

  function buttonsHide() {
    Array.from(document.querySelectorAll('.action-btn'), btn => {
      btn.style.display = 'none';
    });
  }

  function buttons(state) {
    buttonsHide();

    switch(state) {
      case 'start':
        return setDisplayById('#stop', 'inline-block');
      break;
      case 'stop':
        setDisplayById('#start', 'inline-block');
        setDisplayById('#reset', 'inline-block');
      break;
      case 'end':
        return setDisplayById('#reset', 'inline-block');
      case 'reset':
        return setDisplayById('#start', 'inline-block');
      default:
      break;
    }
  }

  class Game {
    constructor(params) {
      this.timeLimit = 10; // seconds
      this.state = 'reset'; // start, stop, end
      this.timer = 0;
      this.timerCount = 0;
      this.score = 0;
      this.debug = (params && params.debug) ? params.debug : false;

      this.setup();
    }

    bindEventListener(square) {
      const checkMark = '<i class="fas fa-check-circle"></i>';

      square.addEventListener('click', () => {
        if (square.className === 'active' && this.timer !== 0) {
          square.innerHTML = checkMark;
          square.className = '';
          this.increaseScore();
          setTimeout(() => {
            square.innerHTML = '';
          }, 150);
          if (this.debug) console.log('[VALID] click event');
        }
      });
    }

    increaseScore() {
      this.score++;
      if (this.debug) console.log('score', this.score);
      updateScore(this.score);
    }

    resetScore() {
      this.score = 0;
      updateScore(this.score);
    }

    countDown() {
      this.timerCount++;
      if (this.debug) console.log('timerCount', this.timerCount);

      if (this.timerCount >= this.timeLimit) {
        this.setState('end');
      }

      this.timeRemaining();
      this.randomSquare();
    }

    resetSquare(square) {
      square.className = '';
    }

    randomSquare() {
      const squares = document.querySelectorAll('#board .row div');
      const square = squares[randomInteger(0, squares.length - 1)];

      this.bindEventListener(square);
      square.className = 'active';

      setTimeout(() => {
        this.resetSquare(square);
      },randomInteger(500, 1500));
    }

    timeRemaining() {
      document.querySelector('#count-down').innerHTML = this.timeLimit - this.timerCount;
    }

    gameTime() {
      if (this.debug) console.log('state', this.state);

      buttons(this.state);

      switch(this.state) {
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

    setup() {
      this.gameTime();

      Array.from(document.querySelectorAll('.action-btn'), button => {
        button.addEventListener('click', () => {
          this.setState(button.dataset.state);
        });
      });
    }

    setState(state) {
      this.state = state;
      this.gameTime();
    }

  }

  const wackAMole = new Game();

}());
//# sourceMappingURL=bundle.js.map
