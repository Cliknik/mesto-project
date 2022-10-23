'use strict';

import './index.css';
import { loadCards, addCard, fullScreenCloseBtn, fullScreenImage } from './components/cards.js';
import {openPopup, closePopup} from "./components/modal.js";
import enableValidation from './components/validation.js';
import {overlayHandler, escapeHandler} from './components/utils.js';

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
export const addElementForm = document.getElementById('add-content__form');
const closeAddElementBtn = popupAddElement.querySelector('.edit-form__close-button');

export const elementsContainer = document.querySelector('.elements');

export const popupList = Array.from(document.querySelectorAll('.popup'));

loadCards();

document.addEventListener('keydown', escapeHandler);

popupList.forEach((pop) => pop.addEventListener('click', overlayHandler))

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

enableValidation();
