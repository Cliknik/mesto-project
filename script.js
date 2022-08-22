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
const $fullScreenImage = document.querySelector('#fullscreen-image')
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
  initialCards.map(card => addCard(card.name, card.link));

}
loadCards();



function openEditProfile() {
  $popupEditProfile.style.visibility = 'visible';
  $popupEditProfile.style.opacity = '1';
  $profileNameInput.value = $profileName.textContent;
  $profileAboutInput.value = $profileAbout.textContent;
}

$profileEditBtn.addEventListener('click', openEditProfile);

function closeEditProfile() {
  $popupEditProfile.style.visibility = 'hidden';
  $popupEditProfile.style.opacity = '0';
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
    $popupEditProfile.style.visibility = 'hidden';
    $popupEditProfile.style.opacity = '0';
    }
}
$profileSubmitBtn.addEventListener('click', editProfile);

function openAddElement () {
  $popupAddElement.style.visibility = 'visible';
  $popupAddElement.style.opacity = '1';
  $popupAddElement.querySelector('.edit-form__input[name=description]').value = "";
  $popupAddElement.querySelector('.edit-form__input[name=link]').value = "";
}
$addElementBtn.addEventListener('click', openAddElement);

function closeAddElement () {
  $popupAddElement.style.visibility = 'hidden';
  $popupAddElement.style.opacity = '0';
  $popupAddElement.querySelector('.edit-form__input[name=description]').value = "";
  $popupAddElement.querySelector('.edit-form__input[name=link]').value = "";
}
$closeAddElementBtn.addEventListener('click', closeAddElement);


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
  const $image = cardElement.querySelector('.elements__image');
  $image.addEventListener('click', function(){
    $fullScreenImage.style.visibility = 'visible';
    $fullScreenImage.style.opacity = '1';
    document.querySelector('.popup__fullscreen-image').src = imageLinkValue;
    document.querySelector('.popup__fullscreen-image').alt = `Фото ${descriptionValue}`;
    document.querySelector('.popup__image-capture').textContent = descriptionValue;
    document.querySelector('.popup__image-close').addEventListener('click', function (){
      $fullScreenImage.style.visibility = 'hidden';
      $fullScreenImage.style.opacity = '0';
    })
  })

  cardElement.querySelector('.elements__description').textContent = descriptionValue;
  cardElement.querySelector('.elements__image').src = imageLinkValue;
  cardElement.querySelector('.elements__image').setAttribute('alt', `Фото ${descriptionValue}`);
  $elements.prepend(cardElement);
}

$addElementSubmitBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  const description = $popupAddElement.querySelector('.edit-form__input[name=description]');
  const link = $popupAddElement.querySelector('.edit-form__input[name=link]');
  if (description.value.length === 0) {
    alert("Пожалуйста, оставьте описание для фото")
  }
  else if(link.value.length === 0) {
    alert("Пожалуйста, укажите ссылку на картинку")
  }
  else {
  addCard(description.value, link.value);
  $popupAddElement.style.visibility = 'hidden';
  $popupAddElement.style.opacity = '0';
  description.value = "";
  link.value = "";
  }
});

