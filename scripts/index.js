'use strict';

import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;

const popupEditProfile = document.querySelector('#profile-edit');
const profileEditForm = document.querySelector('#profile-edit__form');
const profileEditBtn = document.querySelector('.profile__edit-button');
const closeProfileEditBtn = popupEditProfile.querySelector('.edit-form__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileNameInput = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const profileAboutInput = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const addElementBtn = document.querySelector('.profile__add-content');
const popupAddElement = document.querySelector('#add-content');
const addElementForm = document.getElementById('add-content__form');
const closeAddElementBtn = popupAddElement.querySelector('.edit-form__close-button');

const elementsContainer = document.querySelector('.elements');

const fullScreenImage = document.querySelector('#fullscreen-image');
const fullScreenElement = fullScreenImage.querySelector('.popup__fullscreen-image');
const fullScreenElementCapture = fullScreenImage.querySelector('.popup__image-capture');
const fullScreenCloseBtn = fullScreenImage.querySelector('.popup__image-close');

const popupList = Array.from(document.querySelectorAll('.popup'));

function loadCards() {
  initialCards.forEach((card) => elementsContainer.prepend(addCard(card.name, card.link)));
}
loadCards();

function openPopup (targetPopup) {
  targetPopup.classList.add('popup_opened');
}

function closePopup (targetPopup) {
  targetPopup.classList.remove('popup_opened');
}

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach(function(pop) {
      pop.classList.remove('popup_opened');
    });
    addElementForm.reset();
  }
}

function layoutHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened')
  }
}

document.addEventListener('keydown', escapeHandler);

popupList.forEach((pop) => pop.addEventListener('click', layoutHandler))

profileEditBtn.addEventListener('click', function (){
  openPopup(popupEditProfile);
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

profileEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closePopup(popupEditProfile);
})

closeProfileEditBtn.addEventListener('click', function() {
  closePopup(popupEditProfile);
})

addElementBtn.addEventListener('click', function (){
  openPopup(popupAddElement);
});

closeAddElementBtn.addEventListener('click', function () {
  closePopup(popupAddElement);
  addElementForm.reset();
})

function addCard (descriptionValue, imageLinkValue) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  const deleteBtn = cardElement.querySelector('.elements__delete-item');
  deleteBtn.addEventListener('click', function() {
    const card = deleteBtn.closest('.elements__card');
    card.remove();
  });
  const image = cardElement.querySelector('.elements__image');
  image.addEventListener('click', function(){
    openPopup(fullScreenImage);
    fullScreenElement.src = imageLinkValue;
    fullScreenElement.alt = `Фото ${descriptionValue}`;
    fullScreenElementCapture.textContent = descriptionValue;
  })

  cardElement.querySelector('.elements__description').textContent = descriptionValue;
  image.src = imageLinkValue;
  image.setAttribute('alt', `Фото ${descriptionValue}`);
  return cardElement;
}

fullScreenCloseBtn.addEventListener('click', function (){
  closePopup(fullScreenImage);
})

addElementForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const description = popupAddElement.querySelector('.edit-form__input[name=description]');
  const link = popupAddElement.querySelector('.edit-form__input[name=link]');
  elementsContainer.prepend(addCard(description.value, link.value));
  closePopup(popupAddElement);
  addElementForm.reset();
})

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

enableValidation();
