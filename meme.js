var generateBtn = document.querySelector('#generate');
var memeContainer = document.querySelector('#meme-container');

function createMeme() {
	var memeDiv = document.createElement('div');
	var img = document.createElement('img');
	var topText = document.createElement('div');
	var botText = document.createElement('div');
	var deleteBtn = document.createElement('button');

	// if URL text input entered:
	if (document.querySelector('#img-url').value) {
		img.src = document.querySelector('#img-url').value;

		// if either caption text input filled out:
		if (document.querySelector('#top-text').value || document.querySelector('#bot-text').value) {
		topText.textContent = document.querySelector('#top-text').value;
		botText.textContent = document.querySelector('#bot-text').value;
		
		// if both caption text inputs left empty:
		} else {
			img.src = 'seriously.jpg';
			img.alt = 'If the cat can\'t use the keyboard, you\'d better';
			topText.textContent = 'human, enter a cat-tion';
			botText.textContent = 'or else... (it\'s not a meme)';
			botText.style.whiteSpace = 'pre';
		}

	// if no URL entered:
	} else {
		img.src = 'https://i.giphy.com/media/5ftsmLIqktHQA/giphy.webp';
		img.alt = 'ah ah ah, you didn\'t say the magic word';
		topText.textContent = 'ah ah ah';
		botText.textContent = 'you didn\'t include a URL';
	}

	// add classes to created elements:
	img.classList.add('meme-img'); // :before and :after content if URL creates broken image
	topText.classList.add('row1');
	botText.classList.add('row2');
	memeDiv.classList.add('meme-div');
	deleteBtn.classList.add('delete-btn');
	deleteBtn.classList.add('fas');
	deleteBtn.classList.add('fa-times');

	// add elements to div:
	memeDiv.append(img);
	memeDiv.append(topText);
	memeDiv.append(botText);
	memeDiv.append(deleteBtn);

	// add div to container:
	memeContainer.append(memeDiv);

	// click to delete appended div from parent contaiiner:
	deleteBtn.addEventListener('click', function() {
		memeContainer.removeChild(memeDiv);
	});
}

generateBtn.addEventListener('click', function(event) {
	event.preventDefault(); // prevents click from reloading page
	createMeme();
	document.querySelector('#meme-form form').reset(); // resets form inputs to placeholders
});