//Слушатель кнопки Escape для закрытия модалок
function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Открытие модалок
export function openPopup (targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeHandler);
}

//Закрытие модалок
export function closePopup (targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeHandler);
}
