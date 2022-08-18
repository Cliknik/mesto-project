const $elements = document.querySelector('.elements');
let $element = $elements.querySelectorAll('.elements__card');
const initialCards = [
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

function loadCards() {
    $elements.innerHTML = initialCards.map(card => ` <li class="elements__card">
          <button class="elements__delete-item" type="button"></button>
          <img src="${card.link}" class="elements__image" alt="Фото ${card.name}">
          <h2 class="elements__description">${card.name}</h2>
          <button class="elements__like elements__like_status_inactive" type="button"></button>
        </li>`).join('');

}
loadCards();
