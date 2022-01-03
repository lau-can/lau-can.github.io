let URL = "https://api.first.org/data/v1/countries"

let countryListRaw = ''; // list of country received via API
let countryList = []; // list of countries to chose from
let letterList = 'abcdeéfghijklmnopqrstuvwxyz'; // letters to generate HTML buttons
let guessedLetters = []; // contains guessed letters
let country = ''; // contains random country to be guessed
let missedLetters = 0; // increments at every missed letter
let clickedLetters = []; // contains all the letters that have been pressed
let guessedSoFar = []; // contains the status of the word from HTML

// Requests list of countries from public API
function generateWord(url) {

	let requestRead = new XMLHttpRequest();
	requestRead.open("GET", url, true);
	requestRead.send();

	requestRead.onreadystatechange = function () {
		if (requestRead.readyState == 4) {
			if (requestRead.status == 200) {
				countryListRaw = JSON.parse(requestRead.responseText);
				printCountry();
			}
		}
	};
}

// Removes the countries with space in their names (for simplicity)
function printCountry() {
	for (let field in countryListRaw){
		if (field === "data") {
			for (let code in countryListRaw[field]) {
				if (countryListRaw[field][code].country.indexOf(' ') < 0) {
					countryList.push(countryListRaw[field][code].country.toLowerCase());
				}
			}
		}
	}
	country = randomCountry();
	generateLetterButtons();
}

// Picks a random country from the list
function randomCountry() {
	return countryList[Math.floor(Math.random()*countryList.length)];
}

// Generates HTML button layout
function generateLetterButtons() {
	let htmlButtons = '';
	letterList.split('').forEach( element => {
		htmlButtons += '<button id=\'' + element + '\'' + ' onClick=checkLetter(this.id)>'+element+'</button>';
	});
	document.getElementById('letterButtons').innerHTML = htmlButtons;
	generateCountryPlaceholder();
}

// Called at each click on a letter button
function checkLetter(id){
	// Creates list of pushed buttons
	clickedLetters.push(id.toUpperCase());
	document.getElementById('clickedLetters').innerText = String(clickedLetters);
	//document.getElementById(id).style.color = 'red';
	document.getElementById(id).style.display = 'none';
	// If letter guessed, we store it
	if (country.indexOf(id) >= 0) {
		if (guessedLetters.indexOf(id)<0){
			guessedLetters.push(id);
		}
	// If letter not guessed we increment miss counter and update picture
	} else {
		missedLetters++;
		document.getElementById('hangmanImage').src = String(missedLetters) + '.png';
		setTimeout( () => {
			if (missedLetters === 6) {
				alert('Game over! Answer was: ' + country.toUpperCase());
				location.reload();
			}
		},100)
	}
	generateCountryPlaceholder();
}

// Generates in HTML the name of the country to be guessed
function generateCountryPlaceholder() {
	let htmlCode = '';
	country.split('').forEach(letterCountry => {
		if (guessedLetters.indexOf(letterCountry) >=0 ) {
			htmlCode += '<span>' + ' ' + letterCountry.toUpperCase() + ' ' + '</span>';
		} else {
			htmlCode += '<span>' + ' _ ' + '</span>';
		}
	})
	document.getElementById('countryToBeGuessed').innerHTML = htmlCode;
	document.getElementById('wrongLetter').innerText = missedLetters;
	setTimeout( () => {
		checkWin();
	},100);
}

// Checks if the country name was guessed
function checkWin() {
	guessedSoFar = document.getElementById('countryToBeGuessed').innerText.split(' ');
	if(guessedSoFar.indexOf('_') < 0) {
		alert('You win!');
		location.reload();
	}
}
