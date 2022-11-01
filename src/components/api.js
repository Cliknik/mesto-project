//Получение запросов
function getResponseData(res){
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

//Настройки для запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '2359e7ee-1ae1-4ab3-83c5-a7acadc4381a',
    'Content-Type': 'application/json'
  }
}

//Подгружаем информацию о пользователе с сервера при открытии страницы
export function getUserInfo(){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Подгружаем и добавляем карточки с сервера
export function getInitialCards(){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Редактирование профиля
export function editProfileInfo(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Закгрузка новой карточки на страницу
export function postNewCard(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Удаление карточки
export function deleteCard(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Ставим лайк
export function putLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Убираем лайк
export function deleteLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
}

//Меняем аватар
export function postAvatar(avatarLink){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`
    })
  })
    .then((res) => {
      return getResponseData(res);
    })
}

