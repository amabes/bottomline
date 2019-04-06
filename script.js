class Game {
  constructor() {
    // moleVisibility is random
    this.timeLimit = 6; // seconds
    this.gameState = null;// stop || start
    this.timer = null;
    this.timerCount = 0;

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
  }

  timeRemaining() {
    document.querySelector('#count-down').innerHTML = this.timeLimit - this.timerCount;
  }

  setDisplayById(id, styleProp) {
    document.querySelector(id).style.display = styleProp;
  }

  buttonsHide() {
    var btns = document.getElementsByClassName('btn');

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

  scoreCardShow() {
    this.setDisplayById('#score-card', 'block');
  }
  scoreCardHide() {
    this.setDisplayById('#score-card', 'none');
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
        this.scoreCardShow();
        this.buttonsEnd();
        console.log('end');
      break;
      case 'reset':
        clearInterval(this.timer);
        this.timerCount = 0;
        this.buttonsReset();
        this.timeRemaining();
        this.scoreCardHide();
        console.log('reset');
      break;
      default:
        this.timeRemaining();
        console.log('default');
      break;
    }
  }

  setup() {
    this.timeRemaining();
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

var wackAMole = new Game();
