'use strict';

import './index.css';
import { loadCards, addCard} from './components/cards.js';
import {openPopup, closePopup} from "./components/modal.js";
import {enableValidation} from './components/validation.js';

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupEditProfile = document.querySelector('#profile-edit');
const profileEditForm = document.forms['user-info'];
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileNameInput = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const profileAboutInput = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const addElementBtn = document.querySelector('.profile__add-content');
const popupAddElement = document.querySelector('#add-content');
const newImageDescription = popupAddElement.querySelector('.edit-form__input[name=description]');
const newImageUrl = popupAddElement.querySelector('.edit-form__input[name=link]');
const addElementForm = document.forms['content-info'];

export const elementsContainer = document.querySelector('.elements');

loadCards();

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_inactive',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error-message_active'
});

//На каждый попап навешиваем слушатель крестика и клика по оверлею
popupList.forEach((popup) => {
  addEventListener('mousedown', function(evt){
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup-close')) {
      closePopup(popup);
    }
  })
})

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

addElementBtn.addEventListener('click', function (){
  openPopup(popupAddElement);
});

addElementForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  elementsContainer.prepend(addCard(newImageDescription.value, newImageUrl.value));
  closePopup(popupAddElement);
  evt.target.reset();
});
