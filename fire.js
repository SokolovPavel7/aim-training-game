const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  '#90EE90',
  '#66CDAA',
  '#008B8B',
  '#4682B4',
  '#FFEFD5',
  '#00008B',
  '#FFE4C4',
  '#00FFFF',
];

let time = 0;
let sсore = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault(); /*отменяем появление # в адресной строке при нажатии на кномку, т.к. у нас в теге прописаном href="#"*/
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
  }
  startGame();
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    sсore++; /*увеличиваем счет*/
    event.target.remove(); /*удаляем кружок*/
    createRandomCircle();
  }
});

function startGame() {
  screens[1].classList.add('up');
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove(); /*убирает отсчет времени после завершения игры*/
  board.innerHTML = `<h1>Cчёт: <span class="primary">${sсore}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(height - size, 0);
  const colorsRandom = getRandomColors();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = colorsRandom;

  board.append(circle);
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColors() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
