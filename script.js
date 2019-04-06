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

  defaultButtons () {
    document.querySelector('#play').style.display = 'inline-block';
    document.querySelector('#stop').style.display = 'none';
    document.querySelector('#reset').style.display = 'none';
  }

  gameTime() {
    switch(this.gameState) {
      case 'start':
        this.timer = setInterval(this.countDown.bind(this), 1000);
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#stop').style.display = 'inline-block';
        document.querySelector('#reset').style.display = 'inline-block';
        console.log('start');
      break;
      case 'stop':
        clearInterval(this.timer);
        document.querySelector('#play').style.display = 'inline-block';
        document.querySelector('#stop').style.display = 'none';
        document.querySelector('#reset').style.display = 'inline-block';
        console.log('stop');
      break;
      case 'reset':
        clearInterval(this.timer);
        this.timerCount = 0;
        this.defaultButtons();
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
