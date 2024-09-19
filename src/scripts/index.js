import '../pages/index.css'; 
import { createCard, deleteCard, likeCard } from './card.js'; 
import {
  openPopup,
  closePopup,
  closePopupButton,
  closePopupOverlay,
} from './modal.js'; 
import { clearValidation, enableValidation } from './validation.js'; 
import {
  patchServerProfile,
  postServerCard,
  patchServerAvatar,
  getServerProfile,
  getServerCards,
} from './api.js';

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
const userAvatar = document.querySelector('.profile__image');
const editProfileForm = document.forms['edit-profile']; 
const addCardForm = document.forms['new-place']; 
const editAvatarForm = document.forms['edit-avatar'];
const inputAvatarFormLink = document.forms['edit-avatar']['link-avatar'];
const inputNameFormProfile = document.forms['edit-profile'].name; 
const inputDescriptionFormProfile = document.forms['edit-profile'].description;
const inputTitleFormAddNewCard = document.forms['new-place']['place-name']; 
const inputLinkFormAddNewCard = document.forms['new-place'].link; 
const popupImageCaption = document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close'); 
const popups = document.querySelectorAll('.popup'); 
const editAvatarButton = document.querySelector('.profile__image-edit-button');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-isunactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}; 

function addCard(cardElement) {
  cardsList.prepend(cardElement);
}

addCardForm.addEventListener('submit', cardFormSubmit); 

editProfileForm.addEventListener('submit', profileFormSubmit);

editProfileButton.addEventListener('click', () => {
  inputNameFormProfile.value = userName.textContent; 
  inputDescriptionFormProfile.value = userDescription.textContent; 
  clearValidation(editProfileForm, validationConfig); 
  openPopup(popupEdit); 
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

editAvatarButton.addEventListener('click', () => {
  openPopup(popupEditAvatar); 
});

editAvatarForm.addEventListener('submit', editAvatarFormSubmit);

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
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerProfile(inputNameFormProfile, inputDescriptionFormProfile);
  clearValidation(editProfileForm, validationConfig);
  closePopup(popupEdit);
  button.textContent = 'Сохранить';
}

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  const item = {}; 
  item.likes = new Array();
  item.name = inputTitleFormAddNewCard.value; 
  item.link = inputLinkFormAddNewCard.value; 
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  postServerCard(item)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const cardElement = createCard(
        result,
        deleteCard,
        likeCard,
        openFullImage
      ); 
      addCard(cardElement); 
    })
    .catch((err) => {
      console.log(err); 
    });

  addCardForm.reset(); 
  clearValidation(addCardForm, validationConfig); 
  closePopup(popupAddCard); 
  button.textContent = 'Сохранить';
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault(); 
  userAvatar.style.backgroundImage = 'url(' + inputAvatarFormLink.value + ')';
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerAvatar(inputAvatarFormLink.value);
  editAvatarForm.reset(); 
  clearValidation(editAvatarForm, validationConfig); 
  closePopup(popupEditAvatar); 
  button.textContent = 'Сохранить';
}

popupCloseButtons.forEach(function (item) {
  item.addEventListener('click', closePopupButton); 
});

popups.forEach(function (item) {
  item.addEventListener('click', closePopupOverlay); 
});

enableValidation(validationConfig); 

const fetchProfile = getServerProfile().then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

const fetchCards = getServerCards().then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

Promise.all([fetchProfile, fetchCards])
  .then((results) => {
    userName.textContent = results[0]['name'];
    userName._id = results[0]['_id'];
    userDescription.textContent = results[0]['about'];
    userAvatar.style.backgroundImage = 'url(' + results[0]['avatar'] + ')';
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = createCard(
        element,
        deleteCard,
        likeCard,
        openFullImage
      ); 
      addCard(cardElement);
    });
  })
  .catch((err) => {
    console.log(err); 
  });

export { cardTemplate, addCard, userName };