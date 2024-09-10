import { cardTemplate } from './index.js';

function createCard(item, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const delButton = cardElement.querySelector('.card__delete-button'); 
  const cardImg = cardElement.querySelector('.card__image'); 
  const LikeButton = cardElement.querySelector('.card__like-button'); 
  cardImg.src = item.link; 
  cardImg.alt = item.name; 
  cardElement.querySelector('.card__title').textContent = item.name; 
  delButton.addEventListener('click', function() {
    deleteCard(delButton); 
  });
  LikeButton.addEventListener('click', likeCard);
  cardImg.addEventListener('click', openFullImage);  
  return cardElement; 
}

function deleteCard(button) {
  button.closest('.card').remove(); 
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }; 