import {closePopup} from "./modal";


//Слушатель кнопки Escape для закрытия модалок
export function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Меняем инфрмацию о пользователе
export function updateUserInfo(avatar, name, about, json){
  name.textContent = json['name'];
  about.textContent = json['about'];
  avatar.src = json['avatar'];
}

