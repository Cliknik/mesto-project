//Открытие модалок
import {escapeHandler, overlayHandler} from "./utils";

export function openPopup (targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeHandler);
  targetPopup.addEventListener('click', overlayHandler);
}

//Закрытие модалок
export function closePopup (targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeHandler);
  targetPopup.removeEventListener('click', overlayHandler);
}
