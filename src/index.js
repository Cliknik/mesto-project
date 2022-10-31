'use strict';

import './index.css';
import {addCard, renderInitialCards} from './components/cards.js';
import {openPopup, closePopup} from "./components/modal.js";
import {enableValidation} from './components/validation.js';
import {getInitialCards , editProfileInfo, getUserInfo, postNewCard} from './components/api';
import {updateUserInfo} from "./components/utils";

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupEditProfile = document.querySelector('#profile-edit');
const profileEditForm = document.forms['user-info'];
const profileEditBtn = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileNameInput = popupEditProfile.querySelector('.edit-form__input[name="name"]');
export const profileAboutInput = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const addElementBtn = document.querySelector('.profile__add-content');
const popupAddElement = document.querySelector('#add-content');
export const newImageDescription = popupAddElement.querySelector('.edit-form__input[name=description]');
export const newImageUrl = popupAddElement.querySelector('.edit-form__input[name=link]');
const addElementForm = document.forms['content-info'];

export const elementsContainer = document.querySelector('.elements');

getUserInfo()
  .then((data) => {
  updateUserInfo(data)
  const myId = data['_id'];
  getInitialCards()
    .then((json) => {
      renderInitialCards(json, myId)
    })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошбика: ${err}`);
  })
})

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
  editProfileInfo(profileNameInput.value, profileAboutInput.value)
    .then((json) => {
      updateUserInfo(json);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
  closePopup(popupEditProfile);
})

addElementBtn.addEventListener('click', function (){
  openPopup(popupAddElement);
});

addElementForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  postNewCard(newImageDescription.value, newImageUrl.value)
    .then((json) => {
      elementsContainer.append(addCard(json['name'], json['link'], json['owner']['_id'], json['owner']['_id'], json['likes'], json['_id']));
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
  closePopup(popupAddElement);
  evt.target.reset();
});
