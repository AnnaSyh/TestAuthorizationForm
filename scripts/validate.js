'use strict'

import { configData } from "./configData.js";
import { configDataPass } from "./configData.js";

console.log('configDataPass = ', configDataPass);

const showInputError = (inputElement, { inputErrorClass, errorClass }) => {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = inputElement.validationMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, { inputErrorClass, errorClass }) => {
	const errorElement = inputElement.closest('form').querySelector(`.${inputElement.id}-error`);

	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (inputElement, { inputErrorClass, errorClass }) => {
	if (!inputElement.validity.valid) {
		showInputError(inputElement, { inputErrorClass, errorClass });
	} else {
		hideInputError(inputElement, { inputErrorClass, errorClass });
	}
};

const checkInputInfo = (inputElement) => {
	if (inputElement.classList.contains('has-info')) {
		const inputElementInfo = inputElement.closest('.firecode-form__row');
		inputElementInfo.querySelector('.firecode-form__info').classList.remove('firecode-form__info');
	}
};



const setEventListeners = (formElement, { inputSelector, submitButtonSelector,
	inactiveButtonClass, inputErrorClass, errorClass }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(inputElement, { inputErrorClass, errorClass });
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
		inputElement.addEventListener('click', function () {
			checkInputInfo(inputElement);
		});
	});
};

const enableValidation = (configData) => {
	const { formSelector, inputSelector, submitButtonSelector,
		inactiveButtonClass, inputErrorClass, errorClass
	} = configData
	const formList = Array.from(document.querySelectorAll(formSelector));

	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		const newObj = {
			inputSelector, submitButtonSelector,
			inactiveButtonClass, inputErrorClass, errorClass
		}
		setEventListeners(formElement, newObj)
	});
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	const isFormValid = hasInvalidInput(inputList);
	buttonElement.classList.toggle(inactiveButtonClass, isFormValid);
	buttonElement.disabled = isFormValid;
};

enableValidation(configData);



// Функция активации валидации пароля.
const enablePasswordValidation = (config) => {
	// извлекаем данные из конфига.
	const { formSelector, passwordSelector, submitButtonSelector, disableButtonClass } = config;
	// находим элемент формы по значению из formSelector из конфига.
	const form = document.querySelector(formSelector);
	// находим все поля формы
	const formList = Array.from(document.querySelectorAll(passwordSelector));

	console.log('enablePasswordValidation formList = ', formList);

	// находим элемент кнопки по значению из submitButtonSelector из конфига.
	const formSubmitButton = document.querySelector(submitButtonSelector);
	// С помощью деструктуризации извлекаем поля пароля из NodeList
	const [passwordInput, passwordInput2] = document.querySelectorAll(passwordSelector);

	[passwordInput, passwordInput2].forEach(input => {
		// Навешиваем слушатель на ввод в поля пароля.
		input.addEventListener('input', () => {
			console.log('password input = ', input);
			// Если значения в пароле не совпадают, то делаем поле passwordInput2 невалидным с помощью setCustomValidity
			if (passwordInput.value !== passwordInput2.value) {
				passwordInput2.setCustomValidity('Пароли в полях не совпадают');
			} else {
				passwordInput2.setCustomValidity('');
			}
			/*  Метод checkInputValidity либо отображает, либо скрывает текст ошибки.
				Данный метод мы вызываем здесь, чтобы ввод в passwordInput влиял на отображение ошибки для passwordInput2
				В ином случае изменение в поле passwordInput не будет обновлять статус ошибки в поле passwordInput2
			*/

			checkInputValidity(input, passwordInput2, config);

			toggleButtonState(
				formList,
				formSubmitButton,
				disableButtonClass
			)
		})
	})
}

enablePasswordValidation(configDataPass);