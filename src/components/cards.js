'use strict';

import {openPopup} from './modal.js';
import {elementsContainer} from "../index.js";
import {deleteCard, putLike, deleteLike} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

const fullScreenImage = document.querySelector('#fullscreen-image');
const fullScreenElement = fullScreenImage.querySelector('.popup__fullscreen-image');
const fullScreenElementCapture = fullScreenImage.querySelector('.popup__image-capture');

//Проверяем, ставил ли я лайк на карточку
function hasMyLike(myId, likes) {
  return likes.some((obj) => {
    return obj['_id'] == myId;
  })
}

//Отрисовка карточек с сервера
export function renderInitialCards(json, myId) {
  json.forEach((card) => {
    elementsContainer.prepend(addCard(card.name, card.link, card['owner']['_id'], myId, card['likes'], card['_id']))
  });
}

//Добавить карточку
export function addCard (descriptionValue, imageLinkValue, userId, myId, likes, cardId) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const likeButton = cardElement.querySelector('.elements__like');

  //Отображение кол-ва лайков
  const likesCounter = cardElement.querySelector('.elements__like-counter');
  likesCounter.textContent = likes.length;

  //Проверяем наличие моих лайков на карточках и меняем состояния лайка
  if (hasMyLike(myId, likes)) {
    likeButton.classList.add('elements__like_active')
  }
  //Слушатель на лайк
  likeButton.addEventListener('click', function (evt) {
    if (hasMyLike(myId, likes)) {
      deleteLike(cardId)
        .then((res) => {
          likesCounter.textContent = res['likes'].length;
          evt.target.classList.toggle('elements__like_active');
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошбика: ${err}`);
        })
    }
    else {
      putLike(cardId)
        .then((res) => {
          likesCounter.textContent = res['likes'].length;
          evt.target.classList.toggle('elements__like_active');
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошбика: ${err}`);
        })
    }
  });

  //Ставим кнопку удаления только на добавленные мною карточки
  const deleteBtn = cardElement.querySelector('.elements__delete-item');
  if (myId == userId) {
    deleteBtn.addEventListener('click', function() {
      const card = deleteBtn.closest('.elements__card');
      card.remove();
      deleteCard(cardId)
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошбика: ${err}`);
        })
    });
  }
  else {
    deleteBtn.remove()
  }

  //Слушатель для открытия карточки на весь экран
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
