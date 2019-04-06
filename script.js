var gameState = 'new'; // stop || start
var timelimit = 60;
// moleVisibility is random
function gameTime (gameState) {
  switch(gameState) {
    case 'new':
    return
  }
}

class Game {
  constructor() {
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
        console.log('reset');
      break;
      default:
        console.log('default');
      break;
    }
  }

  play() {
    this.gameState = 'start';
    this.gameTime(this.gameState);
  }

}

(function(){
  window.wackAMole = new Game();
})();
