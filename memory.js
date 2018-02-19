// my actual cats
var imgs = [
	'indie.jpg',
	'indie-super.png',
	'little.jpg',
	'little-shoes.jpg',
	'little-silly.jpg',
	'nola.jpg',
	'nola-kale.jpg',
	'nola-pillow.jpg',
	'nola-silly.jpg',
	'nola-sit.jpg',
	'nola-tail.jpg',
	'olive.jpg',
	'olive-arm.jpg',
	'olive-keyboard.jpg',
	'olive-shoulder.jpg',
	'olive-silly.jpg',
	'olive-us.jpg',
	'tiger.jpg',
];

var easy = document.querySelector('#easy');
var medium = document.querySelector('#medium');
var hard = document.querySelector('#hard');
var cardDiv = document.querySelector('#card-container');
var reset = document.querySelector('#reset');
var score = document.querySelector('#score');
var scoreCount = document.querySelector('#score-count');
var combo = document.querySelector('#combo');
var lives = document.querySelector('#lives');
var livesCount = document.querySelector('#lives-count');

var oneFlipped = false; // true denotes a first card currently flipped
var twoFlipped = false; // true denotes a second card currently flipped
var boardLocked = false // disables click to flip card
var mode = 12; // game difficulty, measured in number of inital cards
var matchAttempts = 0; // ++ every two clicks
var multiplier = 0; // ++ every consecutive successful match; resets to 0 on failed match
var totalPairs = 0; // ++ every successful match; game ends at mode / 2
var livesRemaining = 9; // -- every failed match; game ends at 0
var delay = 1250; // card face reveal in milliseconds on failed match

// randomizes imgs
function randomizeImgs(imgsArr) {
	var arrCopy = imgsArr.slice(0);
	return imgsArr.reduce(function(acc) {
		acc.push(arrCopy.splice(Math.floor(Math.random() * arrCopy.length), 1)[0]);
		return acc;
	}, []);
}

// creates game state
function initMode(randomImgsArr, gameDifficulty) {
	var scaledArr = randomImgsArr.slice(0, gameDifficulty / 2); // set number of unique imgs
	var imgPairs = scaledArr.concat(scaledArr); // create pairs of images
	var randomizedPairs = randomizeImgs(imgPairs); // randomize pairs
	for (var i = 0; i < gameDifficulty; i++) {
		var cardBack = document.createElement('div');
		cardBack.classList.add('card');

		// assigns card size 
		if (gameDifficulty === 12) {
			cardBack.classList.add('easy-card');
		} else if (gameDifficulty === 24) {
			cardBack.classList.add('med-card');
		} else {
			cardBack.classList.add('hard-card');
		}

		var cardFace = document.createElement('img');
		cardFace.setAttribute('src', randomizedPairs[i]);
		cardFace.classList.add('hidden', 'card-img');
		cardBack.append(cardFace);
		cardDiv.append(cardBack);
	}
}

// disables card clicks
function lockBoard() {
	return false;
}

// removes appended divs and children
function clearBoard() {
	for (var i = 0; i < mode; i++) {
		cardDiv.removeChild(cardDiv.childNodes[0]);
	}
	oneFlipped = false;
	twoFlipped = false;
	boardLocked = false;
	totalPairs = 0;
	matchAttempts = 0;
	livesRemaining = 9;
	scoreCount.textContent = matchAttempts;
	livesCount.textContent = livesRemaining;
	combo.textContent = '';
	score.classList.remove('end');
	lives.classList.remove('end');
}

// verifies if element is assigned specific class
function classCheck(divChild, targetClass) {
	for (var i = 0; i < divChild.classList.length; i++) {
		if (divChild.classList[i] === targetClass) {
			return true;
		}
	}
	return false;
}

// evaluates whether card with matching src was previously flipped
function srcFlippedCheck(divChild) {
	var allFlippedCards = document.querySelectorAll('.flipped');
	for (var i = 0; i < allFlippedCards.length; i++) {
		if (divChild.src === allFlippedCards[i].src) {
			return true;
		}
	}
	return false;
}

// finds all elements with specific class and removes that class
function removeClass(targetClass) {
  var allWithClass = document.querySelectorAll('.' + targetClass);
  for (var i = 0; i < allWithClass.length; i++) {
  	allWithClass[i].classList.remove(targetClass);
  }
}

// finds all elements with specific class and adds input class
function addClass(targetClass, newClass) {
	var allWithClass = document.querySelectorAll('.' + targetClass);
  for (var i = 0; i < allWithClass.length; i++) {
  	allWithClass[i].classList.add(newClass);
  }
}

// grades matching success
function scoreCheck() {
	var cards = document.querySelectorAll('.card');
	var grade = 1;
	for (var i = 0; i < cards.length; i++) {
		if (grade === 1 && classCheck(cards[i].firstElementChild, 'gold-star')) {
			grade = 2;
		}
		if (grade === 2 && classCheck(cards[i].firstElementChild, 'twice')) {
			grade = 3;
		}
		if (grade === 3 && classCheck(cards[i].firstElementChild, 'void')) {
			return 4;
		}
	}
	return grade;
}

// adds click-to-flip to appended divs
function reveal() {
	var cards = document.querySelectorAll('.card');
	var cardImgs = document.querySelector('.card-img');
	for (var i = 0; i < cards.length; i++) {

		cards[i].addEventListener('click', function addListener() {
			var currentDiv = this;
			var childImg = this.firstElementChild;
			
			if (boardLocked === false && twoFlipped === false && classCheck(childImg, 'hidden')) {
			var points = 0;

				// flips first card
				if (oneFlipped === false) {
					imgHold = childImg;
					imgHold.classList.remove('hidden');
					if (srcFlippedCheck(imgHold) && !classCheck(childImg, 'flipped')) {
						imgHold.classList.add('first');
					}
					this.classList.add('face-up');
					oneFlipped = true;

				// flips second card
				} else {
					childImg.classList.remove('hidden');
					this.classList.add('face-up');
					oneFlipped = false;
					twoFlipped = true;

					// if flipped cards match
					if (imgHold.src === childImg.src) {
						totalPairs++;
						multiplier++;

						if (multiplier > 1) {
							combo.textContent = 'X' + multiplier + ' COMBO!';
						}

						// if both cards in pair flipped only once
						if (!classCheck(imgHold, 'flipped') && !classCheck(childImg, 'flipped')) {
							imgHold.classList.add('lucky');
							childImg.classList.add('lucky');
							addClass('face-up', 'lucky-bg');
							points += 100;
							matchAttempts += points * multiplier;

						// if match is made at first opportunity after revealing both cards, calculate points
						} else if (
							!classCheck(imgHold, 'twice')
							&& !classCheck(childImg, 'twice')
							&& (
								classCheck(imgHold, 'first')
								|| classCheck(imgHold, 'timeout-reveal')
								|| classCheck(childImg, 'timeout-reveal')
							) 
						) {
							imgHold.classList.add('gold-star');
							childImg.classList.add('gold-star');
							addClass('face-up', 'gold-star-bg');
							points += 50;
							matchAttempts += points * multiplier;

						} else {
							imgHold.classList.add('match');
							childImg.classList.add('match');
							points += 25;
							matchAttempts += points * multiplier;
						}
						
						// displays points on second card
						var pointsDisplay = document.createElement('div');
						if (multiplier > 1) {
							pointsDisplay.textContent = '+' + points + '\nX' + multiplier;
						} else {
							pointsDisplay.textContent = '+' + points;
						}
						pointsDisplay.classList.add('points');
						currentDiv.append(pointsDisplay);	
							scoreCount.textContent = matchAttempts;

						// removes points display on second card
						setTimeout(function() {
							currentDiv.removeChild(currentDiv.childNodes[1]);
						}, 1000);

						removeClass('first');
						removeClass('face-up');
						twoFlipped = false;

						// ends game
						if (totalPairs === mode / 2) {
							score.classList.add('end');

							// if all cards flipped only once
							if (scoreCheck() === 1) {
								scoreCount.textContent = matchAttempts + '--***FURLESS VICTORY***';
							// if all pairs matched after seeing each card only once
							} else if (scoreCheck() === 2) {
								scoreCount.textContent = matchAttempts + '--**PURRFECT MEMORY**';
							// if all pairs matched after seeing each card maximum twice
							} else if (scoreCheck() === 3) {
								scoreCount.textContent = matchAttempts + '--*TREAT-WORTHY*';
							// if any card flipped three times
							} else {
								scoreCount.textContent = matchAttempts + '--You have to be kitten me...';
							}
						}
							
					} else {

						// life loss delay display
						if (classCheck(imgHold, 'flipped') || classCheck(childImg, 'flipped')) {
							var full = document.createElement('div');
							full.classList.add('fas', 'fa-heart', 'life-loss');
							currentDiv.append(full);
							
							setTimeout(function() {
								currentDiv.removeChild(currentDiv.childNodes[1]);
								currentDiv.removeChild(currentDiv.childNodes[1]);
								var empty = document.createElement('div');
								empty.classList.add('far', 'fa-heart', 'life-loss');
								currentDiv.append(empty);
							}, 0625);
						}

						// delays before reset 
						setTimeout(function() {

							// monitors number of flips for first card
							if (!classCheck(imgHold, 'flipped')) {
								imgHold.classList.add('flipped', 'hidden');
							} else if (!classCheck(imgHold, 'twice')) {
								imgHold.classList.add('twice', 'hidden');
							} else {
								imgHold.classList.add('void', 'hidden');
							}

							// monitors number of flips for second card
							if (!classCheck(childImg, 'flipped')) {
								if (srcFlippedCheck(childImg)) {
									childImg.classList.add('timeout-reveal')
								}
								childImg.classList.add('flipped', 'hidden');
							} else if (!classCheck(childImg, 'twice')) {
								childImg.classList.add('twice', 'hidden');
							} else {
								childImg.classList.add('void', 'hidden');
							}

							multiplier = 0;
							if (multiplier <= 1) {
								combo.textContent = '';
							}

							// reduces lives if either card flipped at least twice
							if (classCheck(imgHold, 'twice') || classCheck(childImg, 'twice')) {
								livesRemaining--;
								livesCount.textContent = livesRemaining;
								currentDiv.removeChild(currentDiv.childNodes[1]);
								currentDiv.removeChild(currentDiv.childNodes[1]);
					
								if (livesRemaining === 1) {
									livesCount.textContent = livesRemaining + '--LAST LIFE!'

								// ends game if lives reach 0
								} else if (livesRemaining === 0) {
									boardLocked = true;
									livesCount.textContent = livesRemaining + ' Game Over...'
									lives.classList.add('end');
								}
							}
							twoFlipped = false;
							removeClass('first');
							removeClass('face-up');
						}, 1250);
					}
				}
			}
		});
	}
}

function initBoard() {
	initMode(randomizeImgs(imgs), mode);
	reveal();
}

// controls game difficulty
easy.addEventListener('click', function() {
	clearBoard();
	mode = 12; // default difficulty
	initBoard();
});
medium.addEventListener('click', function() {
	clearBoard();
	mode = 24; // increased number of cards
	initBoard();
});
hard.addEventListener('click', function() {
	clearBoard();
	mode = 36; // increased number of cards
	initBoard();
});

// refreshes game state at current difficulty
reset.addEventListener('click', function() {
	clearBoard();	
	initBoard();
});

initBoard();