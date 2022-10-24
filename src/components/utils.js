import {closePopup} from "./modal";


//Слушатель кнопки Escape для закрытия модалок
export function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


