var generateBtn = document.querySelector('#generate');
var memeContainer = document.querySelector('#meme-container');
var imgURLInput = document.querySelector('form')[0];
var topTextInput = document.querySelector('form')[1];
var botTextInput = document.querySelector('form')[2];

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
	document.querySelector('#meme-container').scrollIntoView({behavior: 'smooth', block: 'end'});
});

// auto-populate form on thumbnail click
document.querySelector('#success-kid').addEventListener('click', function() {
	imgURLInput.value = 'https://imgflip.com/s/meme/Success-Kid.jpg';
	topTextInput.value = 'Success Kid';
	botTextInput.value = '';
});
document.querySelector('#grumpy-cat').addEventListener('click', function() {
	imgURLInput.value = 'https://imgflip.com/s/meme/Grumpy-Cat.jpg';
	topTextInput.value = 'Grumpy Cat';
	botTextInput.value = '';
});
document.querySelector('#one-simply').addEventListener('click', function() {
	imgURLInput.value = 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg';
	topTextInput.value = 'One Does Not Simply';
	botTextInput.value = '';
});
document.querySelector('#salt-bae').addEventListener('click', function() {
	imgURLInput.value = 'https://media1.popsugar-assets.com/files/thumbor/yXlp640Tn-VxbxP-vaiI2NKZjxA/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/01/09/880/n/1922507/17b90c6d5873edb1231823.18767920_edit_img_image_18019874_1483991626/i/What-Salt-Bae-Meme.jpg';
	topTextInput.value = 'Salt Bae';
	botTextInput.value = '';
});
document.querySelector('#philosoraptor').addEventListener('click', function() {
	imgURLInput.value = 'https://imgflip.com/s/meme/Philosoraptor.jpg';
	topTextInput.value = 'Philosoraptor';
	botTextInput.value = '';
});
document.querySelector('#jackie-chan').addEventListener('click', function() {
	imgURLInput.value = 'https://imgflip.com/s/meme/Jackie-Chan-WTF.jpg';
	topTextInput.value = 'Jackie Chan Why';
	botTextInput.value = '';
});