export function setDisplayById(id, styleProp) {
  document.querySelector(id).style.display = styleProp;
}

export function updateScore(score) {
  document.querySelector('#score').innerHTML = score;
}

export function randomInteger(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min));
}
