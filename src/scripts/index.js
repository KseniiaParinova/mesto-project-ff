import '../pages/index.css'; 
import { initialCards } from './cards.js'; 
import { createCard, deleteCard, likeCard } from './card.js'; 
import {
  openPopup,
  closePopup,
  closePopupButton,
  closePopupOverlay
} from './modal.js'; 

const cardsList = document.querySelector('.places__list'); 
const cardTemplate = document.querySelector('#card-template').content; 
const editProfileButton = document.querySelector('.profile__edit-button'); 
const addCardButton = document.querySelector('.profile__add-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupAddCard = document.querySelector('.popup_type_new-card'); 
const popupImage = document.querySelector('.popup_type_image'); 
const fullImage = document.querySelector('.popup__image'); 
const userName = document.querySelector('.profile__title'); 
const userDescription = document.querySelector('.profile__description'); 
const editProfileForm = document.forms['edit-profile']; 
const addCardForm = document.forms['new-place']; 
const inputNameFormProfile = document.forms['edit-profile'].name; 
const inputDescriptionFormProfile = document.forms['edit-profile'].description; 
const inputTitleFormAddNewCard = document.forms['new-place']['place-name'];
const inputLinkFormAddNewCard = document.forms['new-place'].link; 
const popupImageCaption= document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

function addCard(cardElement) {
  cardsList.prepend(cardElement); 
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard, likeCard, openFullImage);
  addCard(cardElement); 
});

addCardForm.addEventListener('submit', cardFormSubmit);  

editProfileForm.addEventListener('submit', profileFormSubmit); 

editProfileButton.addEventListener('click', () => {
  inputNameFormProfile.value = userName.textContent; 
  inputDescriptionFormProfile.value = userDescription.textContent; 
  openPopup(popupEdit); 
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard); 
});

function openFullImage(evt) {
  openPopup(popupImage); 
  fullImage.src = evt.target.closest('.card__image').src; 
  fullImage.alt = evt.target.closest('.card__image').alt; 
  popupImageCaption.textContent = evt.target.closest('.card__image').alt; 
}

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  userName.textContent = inputNameFormProfile.value; 
  userDescription.textContent = inputDescriptionFormProfile.value; 
  closePopup(popupEdit); 
}

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  const item = {}; 
  item.name = inputTitleFormAddNewCard.value; 
  item.link = inputLinkFormAddNewCard.value; 
  const cardElement = createCard(item, deleteCard, likeCard, openFullImage);  
  addCard(cardElement); 
  addCardForm.reset(); 
  closePopup(popupAddCard); 
}

popupCloseButtons.forEach(function (item) {
  item.addEventListener('click', closePopupButton);
});

popups.forEach(function (item) {
  item.addEventListener('click', closePopupOverlay);
});

export {
  cardTemplate
};