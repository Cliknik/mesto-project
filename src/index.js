'use strict';

import './index.css';
import {addCard, renderInitialCards} from './components/cards.js';
import {openPopup, closePopup} from "./components/modal.js";
import {enableValidation} from './components/validation.js';
import {getInitialCards, editProfileInfo, getUserInfo, postNewCard, postAvatar} from './components/api';
import {updateUserInfo} from "./components/utils";

const popupList = Array.from(document.querySelectorAll('.popup'));

//Переменные для работы с описанием профиля
const popupEditProfile = document.querySelector('#profile-edit');
const profileEditForm = document.forms['user-info'];
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileNameInput = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const profileAboutInput = popupEditProfile.querySelector('.edit-form__input[name="about"]');

//Переменные для измененя аватара
const avatarEditBtn = document.querySelector('.profile__avatar-edit-button');
const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatarEdit = document.querySelector('#avatar-edit');
const editAvatarForm = document.forms['user-avatar'];
const editAvatarInput = editAvatarForm.querySelector('.edit-form__input');

//Переменные для добавления новых карточек
const addElementBtn = document.querySelector('.profile__add-content');
const popupAddElement = document.querySelector('#add-content');
const newImageDescription = popupAddElement.querySelector('.edit-form__input[name=description]');
const newImageUrl = popupAddElement.querySelector('.edit-form__input[name=link]');
const addElementForm = document.forms['content-info'];

//Контейнер с карточками
const elementsContainer = document.querySelector('.elements');

getUserInfo()
  .then((data) => {
  updateUserInfo(profileAvatar, profileName, profileAbout, data)
  const myId = data['_id'];
  getInitialCards()
    .then((json) => {
      renderInitialCards(elementsContainer, json, myId)
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
      updateUserInfo(profileName, profileAbout, json);
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

avatarEditBtn.addEventListener('click', () =>{
  openPopup(popupAvatarEdit);
})

editAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postAvatar(editAvatarInput.value)
    .then((json) => {
      updateUserInfo(profileAvatar, profileName, profileAbout, json);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
  closePopup(popupAvatarEdit);
  evt.target.reset();
})
