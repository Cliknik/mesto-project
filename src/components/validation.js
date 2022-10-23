import {escapeHandler} from './utils.js';

//Показывам сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('edit-form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__error-message_active');
};

//Скрываем сообщение об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('edit-form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('edit-form__error-message_active');
};

//Првоеряем валидность вводимых данных
const checkValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  }
  else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Меняем состоянии кнопки "Сохранить"
const toggleSubmitButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('edit-form__submit-button_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  }
  else {
    buttonElement.classList.remove('edit-form__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

//Накидываем слушатели на поля формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__input'))
  const buttonElement = formElement.querySelector('.edit-form__submit-button')
  toggleSubmitButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkValidity(formElement, inputElement);
      toggleSubmitButtonState(inputList, buttonElement);
    });
    inputElement.addEventListener('keydown', escapeHandler);
  });
};

//Включаем валидацию
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.edit-form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
export default enableValidation();
