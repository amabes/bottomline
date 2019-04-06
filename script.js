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
      this.stop();
    }

    return this.timerCount;
  }

  gameTime() {
    switch(this.gameState) {
      case 'start':
        this.timer = setInterval(this.countDown.bind(this), 1000);
        console.log('start');
      break;
      case 'stop':
        clearInterval(this.timer);
        console.log('stop');
      break;
      case 'reset':
        clearInterval(this.timer);
        this.timerCount = 0;
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

}

(function(){
  window.wackAMole = new Game();
})();
