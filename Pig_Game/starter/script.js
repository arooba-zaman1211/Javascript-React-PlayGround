//'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const image = document.querySelector('.dice');
const players = document.querySelectorAll('.player');

let activePlayer = 0; //0 for player 1 and 1 for player 2
let randomInteger = 0;
let winningScore = 100; // Set your desired winning score

function switchplayer() {

	document.querySelector(`#current--${activePlayer}`).textContent = '0';
	activePlayer = activePlayer === 0 ? 1 : 0;

	players.forEach(player => player.classList.toggle('player--active'));
}

function roll() {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomInteger = getRandomInt(1, 6);
	console.log("Random Integer:", randomInteger);

	if (randomInteger == 1) {
		image.src = 'dice-1.png';
		switchplayer();
		randomInteger = 0;
	}
	else {
		image.src = `dice-${randomInteger}.png`;
	}

	document.querySelector(`#current--${activePlayer}`).textContent = parseInt(document.querySelector(`#current--${activePlayer}`).textContent) + randomInteger;

}

btnRoll.addEventListener('click', roll);

// Add this to debug and make sure the click event is being registered
btnRoll.addEventListener('click', function () {
	console.log("Button clicked!");
});


function newg() {
	activePlayer = 0
	document.querySelector('#score--0').textContent = 0;
	document.querySelector('#current--0').textContent = 0;
	document.querySelector('#score--1').textContent = 0;
	document.querySelector('#current--1').textContent = 0;

	players.forEach(player => {
		if (player.classList.contains('player--0')) {
			player.classList.add('player--active');
		} else {
			player.classList.remove('player--active');
		}
	});
}

btnHold.addEventListener('click', function () {

	document.querySelector(`#score--${activePlayer}`).textContent = parseInt(document.querySelector(`#score--${activePlayer}`).textContent) + parseInt(document.querySelector(`#current--${activePlayer}`).textContent);
	if (winningCondition()) {
		alert(`Player ${activePlayer + 1} wins!`);
		newg();
		// Optionally, you can reset the game or take other actions here
	} else {
		document.querySelector(`#current--${activePlayer}`).textContent = '0';
		switchplayer();
	}
});

btnNew.addEventListener('click', newg)

function winningCondition() {
	// Check if any player has reached the winning score
	return parseInt(document.querySelector(`#score--${activePlayer}`).textContent) >= winningScore;
}

