import { cardTemplate, userName } from './index.js'; 
import { deleteServerCard, putServerLike, deleteServerLike } from './api.js';

function createCard(item, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const delButton = cardElement.querySelector('.card__delete-button'); 
  const cardImg = cardElement.querySelector('.card__image'); 
  const likeButton = cardElement.querySelector('.card__like-button'); 
  const likeAmount = cardElement.querySelector('.card__like-amount');
  cardImg.src = item.link; 
  cardImg.alt = item.name; 
  cardElement._id = item._id;
  cardElement.owner_id = item.owner._id;
  likeAmount.textContent = item.likes.length;
  item.likes.forEach(function (obj) {
    if (obj['_id'] === userName['_id']) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  cardElement.querySelector('.card__title').textContent = item.name; 
  delButton.addEventListener('click', () => {
    deleteCard(delButton); 
  });
  if (!(cardElement.owner_id === userName._id)) {
    delButton.remove();
  }
  likeButton.addEventListener('click', likeCard); 
  cardImg.addEventListener('click', openFullImage);  
  return cardElement; 
}

function deleteCard(button) {
  const card = button.closest('.card');
  deleteServerCard(card);
  card.remove(); 
}

function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active'); 
  const card = likeButton.closest('.card');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    putServerLike(card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
  } else {
    deleteServerLike(card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };