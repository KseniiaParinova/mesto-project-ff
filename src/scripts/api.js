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

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
  })
  .then(checkAnswer)
}; 

function changeUser(name, about) {
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

function getUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatar
      })
  })
  .then(checkAnswer)
}; 

function getArrayOfCards() {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
  })
  .then(checkAnswer)
};

function addCardToServer(name, link) {
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

function deleteCardsOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(checkAnswer)
}; 

function addToLikesArray(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
      })
      .then(checkAnswer)
}; //доб. лайка 

function deleteToLikesArray(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
      })
      .then(checkAnswer)
}; //удаление лайка 

export {
  getUserInfo,
  getUserAvatar,
  changeUser,
  getArrayOfCards,
  addCardToServer,
  deleteCardsOnServer,
  addToLikesArray,
  deleteToLikesArray
};