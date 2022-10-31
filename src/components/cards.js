'use strict';

import {openPopup} from './modal.js';
import {elementsContainer} from "../index.js";

const cardTemplate = document.querySelector('#card-template').content;

const fullScreenImage = document.querySelector('#fullscreen-image');
const fullScreenElement = fullScreenImage.querySelector('.popup__fullscreen-image');
const fullScreenElementCapture = fullScreenImage.querySelector('.popup__image-capture');

const likesCounter = document.querySelector('.elements__like-counter');

export function renderInitialCards(json, myId) {
  json.forEach((card) => elementsContainer.prepend(addCard(card.name, card.link, card['owner']['_id'], myId, card['likes'])));
}

//Добавить карточку
export function addCard (descriptionValue, imageLinkValue, userId, myId, likes) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  const likesCounter = cardElement.querySelector('.elements__like-counter');
  likesCounter.textContent = likes.length;
  const deleteBtn = cardElement.querySelector('.elements__delete-item');
  if (myId == userId) {
    deleteBtn.addEventListener('click', function() {
      const card = deleteBtn.closest('.elements__card');
      card.remove();
    });
  }
  else {
    deleteBtn.remove()
  }


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
