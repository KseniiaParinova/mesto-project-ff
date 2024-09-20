const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: '6cb71695-8eec-4d63-8861-c3dc8d6c2925',
    'Content-Type': 'application/json',
  },
};

const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//загрузка информации о пользователе 
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
  })
  .then(checkAnswer)
}; 

//загрузка новых данных о пользователе на сервер
export function changeUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          about: about
      })
  })
  .then(checkAnswer)
};

//загрузка аватара
export function getUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatar
      })
  })
  .then(checkAnswer)
}; 

//загрузка массива карточек на страницу
export function getArrayOfCards() {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
  })
  .then(checkAnswer)
};

//загрузка на сервер новой карточки 
export function addCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link,
      })
  })
  .then(checkAnswer)
}; 

//удаление карточек с сервера
export function deleteCardsOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(checkAnswer)
}; 

//добавления лайка карточке
export function addToLikesArray(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
      })
      .then(checkAnswer)
}; 

//удаление лайка у карточки
export function deleteToLikesArray(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
      })
      .then(checkAnswer)
}; 