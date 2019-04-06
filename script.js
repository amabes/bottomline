class Game {
  constructor(params) {
    this.timeLimit = 10; // seconds
    this.gameState = null; // start, stop, end, reset
    this.timer = null;
    this.timerCount = 0;
    this.debug = (params && params.debug) ? params.debug : false;

    this.setup();
  }

  countDown() {
    var timeLimit = this.timeLimit;
    console.log('countDown', this.timeLimit);

    this.timerCount++;
    console.log('countDown', this.timerCount);

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
    var squares = document.querySelectorAll('#board .row div');
    var square = squares[this.randomInteger(0, 8)];

    square.className = 'active';

    var that = this; // normally would use => and wouldn't need this hack

    setTimeout(function() {
      that.resetSquare(square);
    },this.randomInteger(500, 1000));
  }

  timeRemaining() {
    document.querySelector('#count-down').innerHTML = this.timeLimit - this.timerCount;
  }

  setDisplayById(id, styleProp) {
    document.querySelector(id).style.display = styleProp;
  }

  buttonsHide() {
    var btns = document.querySelectorAll('.btn');

    Object.values(btns).forEach(function(btn) {
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
        console.log('start');
      break;
      case 'stop':
        clearInterval(this.timer);
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
        this.timerCount = 0;
        this.buttonsReset();
        this.timeRemaining();
        console.log('reset');
      break;
      default:
        this.timeRemaining();
        console.log('default / setup');
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

var wackAMole = new Game({debug: true});
