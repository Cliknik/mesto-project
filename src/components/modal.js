//Открытие модалок
import {escapeHandler} from "./utils";

export function openPopup (targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeHandler)
}

//Закрытие модалок
export function closePopup (targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeHandler);
}
