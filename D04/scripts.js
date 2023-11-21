let allWords =
	'time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education'.split(
		' '
	);
let lenAllWords = allWords.length;
window.isStart = null;
window.startTime = null;
window.timeForGame = 3;
document.getElementById('timeAndScore').innerHTML = window.timeForGame;

function addClass(tag, className) {
	tag.classList.add(className);
}
function removeClass(tag, className) {
	tag.classList.remove(className);
}

function randomWords() {
	let index = Math.ceil(Math.random() * lenAllWords);
	return allWords[index - 1];
}

function generateWords() {
	const words = document.querySelector('.words');
	words.innerHTML = '';
	let html = '';
	for (let i = 1; i <= 200; i++) {
		let word = `<div class="word">${`<span class="letter">${randomWords()
			.split('')
			.join('</span><span class="letter">')}</span>`}</div>`;
		words.innerHTML += word;
	}
	addClass(document.querySelector('.word'), 'current');
	addClass(document.querySelector('.letter'), 'current');
}

function getWPM() {
	const trueWords = [...document.querySelectorAll('.word.true')].length;

	return trueWords / (window.timeForGame / 60);
}

function gameOver() {
	clearInterval(window.isStart);
	document.getElementById('timeAndScore').innerHTML = `WPM: ${getWPM()}`;
	addClass(document.querySelector('.containWords'), 'overgame');
	document.getElementById('enterToStart').style.display = 'block';

	window.isStart = null;
	window.startTime = null;
	window.timeForGame = 3;
	document.querySelector('.containWords').blur();
}

function solveBackspace(
	isBackspace,
	letterCurrent,
	wordCurrent,
	isFirstLetter
) {
	if (isBackspace)
		if (letterCurrent) {
			if (!isFirstLetter) {
				addClass(letterCurrent.previousSibling, 'current');
				removeClass(letterCurrent.previousSibling, 'correct');
				removeClass(letterCurrent.previousSibling, 'incorrect');
				removeClass(letterCurrent, 'current');
			} else {
				removeClass(letterCurrent, 'correct');
				removeClass(letterCurrent, 'incorrect');
			}
		} else {
			addClass(wordCurrent.lastChild, 'current');
			removeClass(wordCurrent.lastChild, 'correct');
			removeClass(wordCurrent.lastChild, 'incorrect');
		}
}

function solveSpace(isSpace, letterCurrent, wordCurrent) {
	if (isSpace) {
		const lettersToInvalidate = [
			...document.querySelectorAll('.word.current .letter:not(.correct)'),
		];
		lettersToInvalidate.forEach((letter) => {
			addClass(letter, 'incorrect');
		});
		if (lettersToInvalidate.length == 0)
			addClass(document.querySelector('.word.current'), 'true');
		removeClass(wordCurrent, 'current');
		addClass(wordCurrent.nextSibling, 'current');
		addClass(wordCurrent.nextSibling.firstChild, 'current');
		if (letterCurrent) removeClass(letterCurrent, 'current');
	}
}

function solveScroll(wordCurrent) {
	if (wordCurrent.getBoundingClientRect().top > 92) {
		const words = document.querySelector('.words');
		const margin = parseInt(words.style.marginTop || '0px');
		words.style.marginTop = margin - 28 + 'px';
	}
}

function solveCursor() {
	const wordCurrent = document.querySelector('.word.current');
	const letterCurrent = document.querySelector('.letter.current');
	let cursor = document.getElementById('cursor');
	cursor.style.top =
		(letterCurrent || wordCurrent).getBoundingClientRect().top + 2 + 'px';
	cursor.style.left =
		(letterCurrent || wordCurrent).getBoundingClientRect()[
			letterCurrent ? 'left' : 'right'
		] + 'px';
}

function solveLetter(isLetter, letterCurrent, input) {
	if (isLetter)
		if (letterCurrent) {
			if (input === letterCurrent.innerHTML) {
				removeClass(letterCurrent, 'incorrect');
				addClass(letterCurrent, 'correct');
			} else {
				removeClass(letterCurrent, 'correct');
				addClass(letterCurrent, 'incorrect');
			}
			removeClass(letterCurrent, 'current');

			if (letterCurrent.nextSibling)
				addClass(letterCurrent.nextSibling, 'current');
		}
}

function startTyping(isLetter) {
	if (!window.isStart && isLetter) {
		window.isStart = setInterval(() => {
			if (!window.startTime) window.startTime = new Date().getTime();
			const currentTime = new Date().getTime() + 1000;
			const second = Math.round((currentTime - window.startTime) / 1000);
			const timeRemaining = window.timeForGame - second;
			if (timeRemaining < 0) {
				gameOver();
				return;
			}
			document.getElementById('timeAndScore').innerHTML = second + '';
		}, 1000);
	}
}

document.querySelector('.containWords').addEventListener('keyup', (ev) => {
	let wordCurrent = document.querySelector('.word.current');
	let letterCurrent = document.querySelector('.letter.current');
	let isBackspace = ev.key === 'Backspace';
	let isLetter = ev.key != ' ' && !isBackspace;
	let isSpace = ev.key === ' ';
	let isFirstLetter = wordCurrent.firstChild === letterCurrent;

	startTyping(isLetter);
	if (!window.isStart) return;
	solveLetter(isLetter, letterCurrent, ev.key);
	solveBackspace(isBackspace, letterCurrent, wordCurrent, isFirstLetter);
	solveSpace(isSpace, letterCurrent, wordCurrent);
	solveScroll(wordCurrent);
	solveCursor();
});

document.body.addEventListener('keyup', (ev) => {
	if (ev.key === 'Enter' && !window.isStart) {
		console.log(window.isStart);
		generateWords();
		document.querySelector('.containWords').focus();
		removeClass(document.querySelector('.containWords'), 'overgame');
		document.getElementById('timeAndScore').innerHTML = window.timeForGame;
	}
});

document.querySelector('.containWords').addEventListener('focus', () => {
	let cursor = document.getElementById('cursor');
	cursor.style.top =
		document.querySelector('.word.current').getBoundingClientRect().top +
		2 +
		'px';
	cursor.style.left =
		document.querySelector('.word.current').getBoundingClientRect().left + 'px';
	document.getElementById('enterToStart').style.display = 'none';
});

generateWords();

// import laught from './function';

// console.log(laught.hehe);
// console.log(laught.he);
