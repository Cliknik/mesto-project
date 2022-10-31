import {profileNameInput, profileAboutInput, newImageDescription, newImageUrl, elementsContainer} from "../index";
import {renderInitialCards, addCard} from "./cards";
import {updateUserInfo} from "./utils";
import {logPlugin} from "@babel/preset-env/lib/debug";

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
    headers: {
      authorization: '2359e7ee-1ae1-4ab3-83c5-a7acadc4381a'
    }
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
}

//Подгружаем и добавляем карточки с сервера
export function getInitialCards(){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: '2359e7ee-1ae1-4ab3-83c5-a7acadc4381a'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
}

//Редактирование профиля
export function editProfileInfo(){
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '2359e7ee-1ae1-4ab3-83c5-a7acadc4381a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${profileNameInput.value}`,
      about: `${profileAboutInput.value}`
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((json) => {
      updateUserInfo(json);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
}

//Закгрузка новой карточки на страницу
export function postNewCard(){
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '2359e7ee-1ae1-4ab3-83c5-a7acadc4381a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${newImageDescription.value}`,
      link: `${newImageUrl.value}`
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
    .then((json) => {
      elementsContainer.append(addCard(json['name'], json['link'], json['owner']['_id'], json['owner']['_id']));
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
}


