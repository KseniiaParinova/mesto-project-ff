import {deleteCardsOnServer, 
  addToLikesArray, 
  deleteToLikesArray} from './api.js';

//создание карточки
export function createCard(element, deleteCard, liking, openPopupCards, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const titleCard = cardElement.querySelector('.card__title');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.like-counter');
  const cardId = element._id;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  titleCard.textContent = element.name;
  likeCounter.textContent = element.likes.length;
  if (element.owner._id !== currentUserId) {
      buttonDelete.remove();
  };
  updateLikeButtonState(element.likes, currentUserId, buttonLike);
  buttonDelete.addEventListener('click', function() {
      deleteCard(cardElement, cardId);
  });
  buttonLike.addEventListener('click', function() {
      liking(buttonLike, cardId, currentUserId, likeCounter)
  });
  cardImage.addEventListener('click', function() {
      openPopupCards(cardImage);
  });  
  return cardElement;
};

export function liking(button, cardId, currentUser, numberLike) {
  if (button.classList.contains('card__like-button_is-active')) {
      deleteToLikesArray(cardId)
     .then((data) => {
          if (!data.likes.some(user => user._id === currentUser)) {
              button.classList.remove('card__like-button_is-active');
              numberLike.textContent = data.likes.length;
          }
      })
      .catch((error) => {
          console.error('Ошибка при удалении лайка:', error);     });
  } else {
      addToLikesArray(cardId)
      .then((data) => {
          if (data.likes.some(user => user._id === currentUser)) {
              button.classList.add('card__like-button_is-active');
              numberLike.textContent = data.likes.length;
          }
      })
      .catch((error) => {
          console.error('Ошибка при добавлении лайка:', error);
      });
  }
};

// проверка наличия лайка текущего пользователя
function updateLikeButtonState(likes, currentUser, button) {
  if (likes.some(user => user._id === currentUser)) {
      button.classList.add('card__like-button_is-active');
  } else {
      button.classList.remove('card__like-button_is-active');
  }
};

//функция удаления карточки
export function deleteCard(cardElement, cardId) {
  deleteCardsOnServer(cardId)
  .then(() => {
      cardElement.remove();
  })
  .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
  });
};