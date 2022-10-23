import {closePopup} from "./modal";


//Слушатель кнопки Escape для закрытия модалок
export function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Слушатель оверлея для закрытия модалок
export function overlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

