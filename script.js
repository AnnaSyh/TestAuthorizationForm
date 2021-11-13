"use strict";

const radioButtons = document.querySelectorAll('.firecode-form__form-control');
const questions = document.querySelectorAll('.question');

for (let i = 0; i <= radioButtons.length - 1; i++) {
    radioButtons[i].addEventListener('click', switchQuestions);
}

function switchQuestions(evt) {
    const dataNumCurrent = evt.target.getAttribute('data-num');
    const questionCurrentClass = '.question-' + dataNumCurrent;
    const questionCurrent = document.querySelector(questionCurrentClass);

    for (let i = 0; i <= questions.length - 1; i++) {
        questions[i].style.display = "none";
    }
    questionCurrent.style.display = "block";

}
