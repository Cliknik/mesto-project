//Открытие модалок
export function openPopup (targetPopup) {
  targetPopup.classList.add('popup_opened');
}

//Закрытие модалок
export function closePopup (targetPopup) {
  targetPopup.classList.remove('popup_opened');
}
