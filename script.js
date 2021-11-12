"use strict";

const radioButton = document.querySelector('.firecode-form__form-control');

console.log('radioButton = ',radioButton);

radioButton.addEventListener('click', switchQuestions)

function switchQuestions(evt) {
	const labelCurent = evt.target;

	console.log('labelCurent = ',labelCurent);

	const questionCurentNumber = evt.target.getAttribute('data-num');

	console.log('questionCurentNumber = ', questionCurentNumber);
}