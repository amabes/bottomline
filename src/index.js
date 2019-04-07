class Game {
  constructor(params) {
    this.timeLimit = 10; // seconds
    this.gameState = null; // start, stop, end, reset
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
    this.updateScore();
  }

  resetScore() {
    this.score = 0;
    this.updateScore();
  }

  updateScore() {
    document.querySelector('#score').innerHTML = this.score;
  }

  countDown() {
    this.timerCount++;
    if (this.debug) console.log('timerCount', this.timerCount);

    if (this.timerCount >= this.timeLimit) {
      this.end();
    }

    this.timeRemaining();
    this.randomSquare();
  }

  randomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

  resetSquare(square) {
    square.className = '';
  }

  randomSquare() {
    const squares = document.querySelectorAll('#board .row div');
    const square = squares[this.randomInteger(0, 8)];

    this.bindEventListener(square);

    square.className = 'active';

    setTimeout(() => {
      this.resetSquare(square);
    },this.randomInteger(500, 1000));
  }

  timeRemaining() {
    document.querySelector('#count-down').innerHTML = this.timeLimit - this.timerCount;
  }

  setDisplayById(id, styleProp) {
    document.querySelector(id).style.display = styleProp;
  }

  buttonsHide() {
    const btns = document.querySelectorAll('.btn');

    Object.values(btns).forEach(btn => {
      btn.style.display = 'none';
    });
  }

  buttonsEnd() {
    this.buttonsHide();
    this.setDisplayById('#reset', 'inline-block');
  }

  buttonsReset() {
    this.buttonsHide();
    this.setDisplayById('#play', 'inline-block');
  }

  buttonsStop() {
    this.buttonsHide();
    this.setDisplayById('#play', 'inline-block');
    this.setDisplayById('#reset', 'inline-block');
  }

  buttonsStart() {
    this.buttonsHide();
    this.setDisplayById('#stop', 'inline-block');
  }

  gameTime() {
    switch(this.gameState) {
      case 'start':
        this.timeRemaining();
        this.timer = setInterval(this.countDown.bind(this), 1000);
        this.buttonsStart();
        if (this.debug) console.log('start');
      break;
      case 'stop':
        clearInterval(this.timer);
        if (this.debug) console.log(this.timer);
        this.buttonsStop();
        if (this.debug) console.log('stop');
      break;
      case 'end':
        clearInterval(this.timer);
        this.buttonsEnd();
        if (this.debug) console.log('end');
      break;
      case 'reset':
        clearInterval(this.timer);
        this.timer = 0;
        this.timerCount = 0;
        this.resetScore();
        this.buttonsReset();
        this.timeRemaining();
        if (this.debug) console.log('reset');
      break;
      default:
        this.timeRemaining();
        if (this.debug) console.log('setup');
      break;
    }
  }

  setup() {
    this.gameTime();
  }

  setGameState(state) {
    this.gameState = state;
    this.gameTime();
  }

  play() {
    this.setGameState('start');
  }

  stop() {
    this.setGameState('stop');
  }

  end() {
    this.setGameState('end');
  }

  reset() {
    this.setGameState('reset');
  }

}

const wackAMole = new Game();
