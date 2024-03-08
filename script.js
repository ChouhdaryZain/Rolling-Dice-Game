'use strict';

// selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// starting conditions & Start Game method

let scores, currentScore, activePlayer, playing;

const startGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
startGame();

// Switch Player Method

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // Check if dice === 1 
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch the player
      switchPlayer();
    }
  }
})

// 2. Hold Button functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. add the current score to player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(`Score is hold ${scores[activePlayer]}`);
    // 2. score >= 100, player wins, finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
      diceEl.classList.add('hidden');
    }
    // 3. Switch to next player
    if (playing) {
      switchPlayer();
    }
  }
})

// 3. New Game functionality
btnNew.addEventListener('click', startGame);