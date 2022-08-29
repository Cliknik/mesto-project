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
