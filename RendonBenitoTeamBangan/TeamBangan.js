const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let shuffledNumbers = shuffle(numbers);
let flippedCards = [];
let wrongGuesses = 0;
let timer;
let time = 0;
const maxWrongGuesses = 10;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(number, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;

  const frontFace = document.createElement('div');
  frontFace.classList.add('face', 'front');

  const backFace = document.createElement('div');
  backFace.classList.add('face', 'back');
  backFace.textContent = number;

  card.appendChild(frontFace);
  card.appendChild(backFace);

  card.addEventListener('click', () => flipCard(card, number));
  return card;
}

function flipCard(card, number) {
  if (!card.classList.contains('flipped') && flippedCards.length < 2) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }

    if (time === 0) {
      startTimer();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const index1 = parseInt(card1.dataset.index);
  const index2 = parseInt(card2.dataset.index);

  if (shuffledNumbers[index1] === shuffledNumbers[index2]) {
    flippedCards = [];

    if (document.querySelectorAll('.flipped').length === shuffledNumbers.length) {
      showWinPopup();
    }
  } else {
    wrongGuesses++;
    updateWrongGuesses();

    if (wrongGuesses >= maxWrongGuesses) {
      showGameOverPopup();
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 500);
    }
  }

  if (document.querySelectorAll('.flipped').length === shuffledNumbers.length) {
    showWinPopup();
    stopTimer();
  }
}

function resetGame() {
  flippedCards = [];
  shuffledNumbers = shuffle(numbers);
  time = 0;
  wrongGuesses = 0;
  updateGameInfo();
  updateWrongGuesses();

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  for (let i = 0; i < shuffledNumbers.length; i++) {
    const card = createCard(shuffledNumbers[i], i);
    gameBoard.appendChild(card);
  }

  startTimer();
  hideAllPopups();
}

function startGame() {
  document.getElementById('start-page').style.display = 'none';
  document.getElementById('game-page').style.display = 'flex';
  resetGame();
}

function startTimer() {
  stopTimer();
  timer = setInterval(function () {
    time++;
    updateGameInfo();
  }, 1000);
}

function updateGameInfo() {
  const timeSpan = document.getElementById('time');
  timeSpan.textContent = `Time: ${time}s`;
}

function stopTimer() {
  clearInterval(timer);
}

function showWinPopup() {
  const winPopup = document.getElementById('win-popup');
  winPopup.classList.add('show');
  document.getElementById('win-popup-time').textContent = `Time: ${time}s`;
  document.getElementById('win-popup-wrong-guesses').textContent = `Wrong Guesses: ${wrongGuesses}`;
}

function hideWinPopup() {
  const winPopup = document.getElementById('win-popup');
  winPopup.classList.remove('show');
}

function updateWrongGuesses() {
  document.getElementById('wrong-guesses').textContent = `Wrong Guesses: ${wrongGuesses}`;
}

function showHowToPlay() {
  const howToPlayPopup = document.getElementById('how-to-play-popup');
  howToPlayPopup.style.display = 'flex';
}

function hideHowToPlayPopup() {
  const howToPlayPopup = document.getElementById('how-to-play-popup');
  howToPlayPopup.style.display = 'none';
}

function goToStartPage() {
  document.getElementById('game-page').style.display = 'none';
  document.getElementById('start-page').style.display = 'flex';
  stopTimer();
}

function showGameOverPopup() {
  const gameOverPopup = document.getElementById('game-over-popup');
  const gameOverMessage = document.getElementById('game-over-message');
  gameOverMessage.textContent = `You reached the maximum number of wrong guesses.`;
  gameOverPopup.style.display = 'flex';
  stopTimer();
}

function hideGameOverPopup() {
  const gameOverPopup = document.getElementById('game-over-popup');
  gameOverPopup.style.display = 'none';
}

function hideAllPopups() {
  hideWinPopup();
  hideHowToPlayPopup();
  hideGameOverPopup();
}
function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'none';
}


document.getElementById('game-over-popup').addEventListener('click', hideGameOverPopup);

resetGame();