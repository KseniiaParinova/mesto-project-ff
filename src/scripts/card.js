import { cardTemplate } from './index.js';
import { openFullImage } from './modal.js';

function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const delButton = cardElement.querySelector('.card__delete-button'); 
  const cardImg = cardElement.querySelector('.card__image'); 
  cardImg.src = item.link; 
  cardImg.alt = item.name; 
  cardElement.querySelector('.card__title').textContent = item.name; 
  delButton.addEventListener('click', function() {
    deleteCard(delButton); 
  });
  cardElement.addEventListener('click', likeCard);
  cardElement.addEventListener('click', checkImage);
  return cardElement; 
}

function deleteCard(button) {
    button.closest('.card').remove(); 
  }
  
  function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
  }
  
  function checkImage(evt) {
    if (evt.target.classList.contains('card__image')) {
      openFullImage(evt.target);
    }
  }
  
  export { createCard, deleteCard, likeCard, checkImage };