'use strict';

import './index.css';
import {addCard, renderInitialCards} from './components/cards.js';
import {openPopup, closePopup} from "./components/modal.js";
import {enableValidation} from './components/validation.js';
import {getInitialCards, editProfileInfo, getUserInfo, postNewCard, postAvatar} from './components/api';
import {updateUserInfo, switchLoadingMessage} from "./components/utils";

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
const avatarEditForm = document.forms['user-avatar'];
const avatarEditInput = avatarEditForm.querySelector('.edit-form__input');

//Переменные для добавления новых карточек
const addElementBtn = document.querySelector('.profile__add-content');
const popupAddElement = document.querySelector('#add-content');
const newImageDescription = popupAddElement.querySelector('.edit-form__input[name=description]');
const newImageUrl = popupAddElement.querySelector('.edit-form__input[name=link]');
const addElementForm = document.forms['content-info'];

//Контейнер с карточками
const elementsContainer = document.querySelector('.elements');

Promise.all([
  getUserInfo(),
  getInitialCards()
])
  .then(([userInfo, initialCards]) => {
    updateUserInfo(profileAvatar, profileName, profileAbout, userInfo);
    const myId = userInfo['_id'];
    renderInitialCards(elementsContainer, initialCards, myId);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошбика: ${err}`);
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
  switchLoadingMessage(evt.submitter, true)
  editProfileInfo(profileNameInput.value, profileAboutInput.value)
    .then((json) => {
      updateUserInfo(profileAvatar, profileName, profileAbout, json);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {switchLoadingMessage(evt.submitter, false)}, 300)
    })
})

addElementBtn.addEventListener('click', function (){
  openPopup(popupAddElement);
});

addElementForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  switchLoadingMessage(evt.submitter, true)
  postNewCard(newImageDescription.value, newImageUrl.value)
    .then((json) => {
      elementsContainer.append(addCard(json['name'], json['link'], json['owner']['_id'], json['owner']['_id'], json['likes'], json['_id']));
      closePopup(popupAddElement);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {switchLoadingMessage(evt.submitter, false);}, 300)
    })
});

avatarEditBtn.addEventListener('click', () =>{
  openPopup(popupAvatarEdit);
})

avatarEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  switchLoadingMessage(evt.submitter, true)
  postAvatar(avatarEditInput.value)
    .then((json) => {
      updateUserInfo(profileAvatar, profileName, profileAbout, json);
      closePopup(popupAvatarEdit);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {switchLoadingMessage(evt.submitter, false);}, 300)
    })
})
