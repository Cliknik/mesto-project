'use strict';

import {openPopup} from './modal.js';
import {elementsContainer} from "../index.js";

//Массив стоковых карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;

const fullScreenImage = document.querySelector('#fullscreen-image');
const fullScreenElement = fullScreenImage.querySelector('.popup__fullscreen-image');
const fullScreenElementCapture = fullScreenImage.querySelector('.popup__image-capture');

//Загружаем крточки из стокового массива при открыти страницы
export function loadCards() {
  initialCards.forEach((card) => elementsContainer.prepend(addCard(card.name, card.link)));
}

//Добавить карточку
export function addCard (descriptionValue, imageLinkValue) {
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
