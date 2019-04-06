class Game {
  constructor() {
    // moleVisibility is random
    this.timeLimit = 6; // seconds
    this.gameState = null;// stop || start
    this.timer = null;
    this.timerCount = 0;
  }

  countDown() {
    var timeLimit = this.timeLimit;
    console.log('countDown', this.timeLimit);

    this.timerCount++;
    console.log('countDown', this.timerCount);

    if (this.timerCount >= this.timeLimit) {
      this.reset();
    }

    return this.timerCount;
  }

  setDisplayById(id, styleProp) {
    document.querySelector(id).style.display = styleProp;
  }

  buttonsReset() {
    this.setDisplayById('#play', 'inline-block');
    this.setDisplayById('#stop', 'none');
    this.setDisplayById('#reset', 'none');
  }

  buttonsStop() {
    this.setDisplayById('#play', 'inline-block');
    this.setDisplayById('#stop', 'none');
    this.setDisplayById('#reset', 'inline-block');
  }

  buttonsStart() {
    this.setDisplayById('#play', 'none');
    this.setDisplayById('#stop', 'inline-block');
    this.setDisplayById('#reset', 'none');
  }

  gameTime() {
    switch(this.gameState) {
      case 'start':
        this.timer = setInterval(this.countDown.bind(this), 1000);
        this.buttonsStart();
        console.log('start');
      break;
      case 'stop':
        clearInterval(this.timer);
        this.buttonsStop();
        console.log('stop');
      break;
      case 'reset':
        clearInterval(this.timer);
        this.timerCount = 0;
        this.buttonsReset();
        console.log('reset');
      break;
      default:
        console.log('default');
      break;
    }
  }

  play() {
    this.gameState = 'start';
    this.gameTime();
  }

  stop() {
    this.gameState = 'stop';
    this.gameTime();
  }

  reset() {
    this.gameState = 'reset';
    this.gameTime();
  }

}

(function(){
  window.wackAMole = new Game();
})();
