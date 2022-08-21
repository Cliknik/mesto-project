const $popupEditProfile = document.querySelector('#profile-edit');
const $profileEditBtn = document.querySelector('.profile__edit-button');
const $closeProfileEditBtn = $popupEditProfile.querySelector('.edit-form__close-button');
const $profileName = document.querySelector('.profile__name');
const $profileAbout = document.querySelector('.profile__about');
const $profileSubmitBtn = $popupEditProfile.querySelector('.edit-form__submit-button');
const $profileNameInput = $popupEditProfile.querySelector('.edit-form__input[name="name"]');
const $profileAboutInput = $popupEditProfile.querySelector('.edit-form__input[name="about"]');
const $popupAddElement = document.querySelector('#add-content');
const $closeAddElementBtn = $popupAddElement.querySelector('.edit-form__close-button');
const $addElementSubmitBtn = $popupAddElement.querySelector('.edit-form__submit-button');
const $addElementBtn = document.querySelector('.profile__add-content');
const $elements = document.querySelector('.elements');
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



function openEditProfile() {
  $popupEditProfile.classList.add('popup_opened');
  $profileNameInput.value = $profileName.textContent;
  $profileAboutInput.value = $profileAbout.textContent;
}

$profileEditBtn.addEventListener('click', openEditProfile);

function closeEditProfile() {
  $popupEditProfile.classList.remove('popup_opened');
  $profileName.value = $profileName.textContent;
  $profileAbout.value = $profileAbout.textContent;
}

$closeProfileEditBtn.addEventListener('click', closeEditProfile);

function editProfile(evt) {
    evt.preventDefault();
    if ($profileNameInput.value.length === 0) {
      alert("Пожалуйста, представьтесь, не оставляйте поле имени пустым")
    }
    else if($profileAboutInput.value.length === 0) {
      alert("Пожалуйста, представьтесь, не оставляйте поле описания пустым")
    }
    else {
    $profileName.textContent = $profileNameInput.value;
    $profileAbout.textContent = $profileAboutInput.value;
    $popupEditProfile.classList.remove('popup_opened');
    }
}
$profileSubmitBtn.addEventListener('click', editProfile);

function openCloseAddElement () {
  $popupAddElement.classList.toggle('popup_opened');
  $popupAddElement.querySelector('.edit-form__input[name=description]').value = "Ссылка на картинку";
  $popupAddElement.querySelector('.edit-form__input[name=link]').value = "Название";
}
$addElementBtn.addEventListener('click', openCloseAddElement);
$closeAddElementBtn.addEventListener('click', openCloseAddElement);


function addCard (descriptionValue, imageLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_status_active');
    evt.target.classList.toggle('elements__like_status_inactive');
  });
  const deleteBtn = cardElement.querySelector('.elements__delete-item');
  deleteBtn.addEventListener('click', function() {
    const card = deleteBtn.closest('.elements__card');
    card.remove();
  });

  cardElement.querySelector('.elements__description').textContent = descriptionValue;
  cardElement.querySelector('.elements__image').src = imageLinkValue;
  $elements.prepend(cardElement);
}

$addElementSubmitBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  const description = $popupAddElement.querySelector('.edit-form__input[name=description]');
  const link = $popupAddElement.querySelector('.edit-form__input[name=link]');
  addCard(description.value, link.value);
  $popupAddElement.classList.remove('popup_opened');
  description.value = "Название";
  link.value = "Ссылка на картинку";
});

