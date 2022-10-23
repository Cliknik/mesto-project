import {popupList, addElementForm} from "../index.js";


//Слушатель кнопки Escape для закрытия модалок
export function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach(function(pop) {
      pop.classList.remove('popup_opened');
    });
    addElementForm.reset();
  }
}

//Слушатель оверлея для закрытия модалок
export function overlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened')
  }
}

