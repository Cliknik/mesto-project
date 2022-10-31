import {closePopup} from "./modal";
import {profileAbout, profileName} from "../index";


//Слушатель кнопки Escape для закрытия модалок
export function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Меняем инфрмацию о пользователе
export function updateUserInfo(json){
  profileName.textContent = json['name'];
  profileAbout.textContent = json['about'];
}

