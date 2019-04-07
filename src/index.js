import { randomInteger, updateScore } from './helpers.js';
import buttons from './buttons.js';

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
        }, 150)
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
