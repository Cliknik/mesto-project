let $popup = document.querySelector('.popup');
let $profileEditBtn = document.querySelector('.profile__edit-button');
let $closeProfileEditBtn = $popup.querySelector('.edit-form__close-button');
let $profileName = document.querySelector('.profile__name');
let $profileAbout = document.querySelector('.profile__about');
let $profileSubmitBtn = $popup.querySelector('.edit-form__submit-button');
let $profileNameInput = $popup.querySelector('.edit-form__input[name="name"]');
let $profileAboutInput = $popup.querySelector('.edit-form__input[name="about"]');


function openPopup() {
  $popup.classList.add('popup_opened');
  $profileNameInput.value = $profileName.textContent;
  $profileAboutInput.value = $profileAbout.textContent;
}
$profileEditBtn.addEventListener('click', openPopup);
function closePopup() {
  $popup.classList.remove('popup_opened');
  $profileName.value = $profileName.textContent;
  $profileAbout.value = $profileAbout.textContent;
}
$closeProfileEditBtn.addEventListener('click', closePopup);
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
    $popup.classList.remove('popup_opened');
    }
}
$profileSubmitBtn.addEventListener('click', editProfile);
