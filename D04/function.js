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
	wordCurrent = document.querySelector('.word.current');
	letterCurrent = document.querySelector('.letter.current');
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

export { solveLetter, solveBackspace, solveCursor, solveScroll, solveSpace };
