import '../pages/index.css';
import {createCard, 
        deleteCard, 
        liking} 
        from './card.js';
import {openModal,
        closeModal} 
        from './modal.js';
import {enableValidation,
       clearValidation} 
       from './validation.js';
import {getUserInfo, 
       getArrayOfCards, 
       changeUser, 
       addCardToServer, 
       getUserAvatar} 
       from './api.js';
       
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const buttonPopupEdit = formProfile.querySelector('.button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_url');
const buttonPopupNewCard = formCard.querySelector('.button');
const popupBigСard = document.querySelector('.popup_type_image');
const titlePopup = popupBigСard.querySelector('.popup__caption');
const imagePopup = popupBigСard.querySelector('.popup__image');
const popupAvatar = document.querySelector('.popup_editing_avatars');
const profileImage = document.querySelector('.profile__image');
const formAvatar = document.querySelector('.popup_editing_avatars .popup__form');
const inputAvatar = formAvatar.querySelector('#link-input-avatar');
const buttonPopupAvatar = formAvatar.querySelector('.button');
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
let currentUserId = null;

function updateNewAvatar(evt) {
    evt.preventDefault(); 
    const newAvatarUrl = inputAvatar.value; 
    buttonPopupAvatar.textContent = 'Сохранение...';
    buttonPopupAvatar.disabled = true;
    getUserAvatar(newAvatarUrl)
    .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
    })
    .finally(() => {
        buttonPopupAvatar.textContent = 'Сохранить';
        buttonPopupAvatar.disabled = false;
    });
    closeModal(popupAvatar);
};

function submitEditForm(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const about = jobInput.value;
    buttonPopupEdit.textContent = 'Сохранение...';
    buttonPopupEdit.disabled = true;
    changeUser(name, about)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
    })
    .finally(() => {
        buttonPopupEdit.textContent = 'Сохранить';
        buttonPopupEdit.disabled = false;
    });
    closeModal(popupEdit);
    formProfile.reset();
};

function addNewCard(elem) {
    elem.preventDefault();
    const name = cardName.value;
    const link = cardLink.value;
    buttonPopupNewCard.textContent = 'Сохранение...';
    buttonPopupNewCard.disabled = true;
    addCardToServer(name, link)
    .then((data) => {
        const cardElement = createCard(data, deleteCard, liking, openPopupCards, currentUserId);
        placesList.prepend(cardElement);
    })
    .catch((error) => {
        console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
        buttonPopupNewCard.textContent = 'Сохранить';
        buttonPopupNewCard.disabled = false;
    });
    closeModal(popupNewCard);
    formCard.reset();
};

function processCards(cardsArray) {
    cardsArray.forEach((card) => {
    const cardElement = createCard(card, deleteCard, liking, openPopupCards, currentUserId);
        if (cardElement) {
            placesList.append(cardElement);
        } else {
            console.error('Ошибка при создании карточки:', card);
        }
    });
};

profileImage.addEventListener('click', function () {
    openModal(popupAvatar);
    clearValidation(formAvatar, config);
    formAvatar.reset();
});

document.querySelector('.profile__edit-button').addEventListener('click', function() {
    openModal(popupEdit);
    getUserInfo()
    .then(res => {
        nameInput.value = res.name;
        jobInput.value = res.about;
    })
    .catch(error => {
      console.error('Не удалось загрузить информацию о пользователе:', error);
    });
    clearValidation(formProfile, config);
});

document.querySelector('.profile__add-button').addEventListener('click', function() {
    openModal(popupNewCard);
    formCard.reset();
    clearValidation(formCard, config);
 });

function openPopupCards(elem) {
    imagePopup.src = elem.src;
    imagePopup.alt = elem.alt;
    titlePopup.textContent = elem.alt;
    openModal(popupBigСard);
};

document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', function () {
    const openPopup = document.querySelector('.popup_is-opened');
       closeModal(openPopup);
    });
});

formAvatar.addEventListener('submit', updateNewAvatar);
formProfile.addEventListener('submit', submitEditForm);
formCard.addEventListener('submit', addNewCard);

document.addEventListener('DOMContentLoaded', () => {
    const userInfoPromise = getUserInfo();
    const cardsPromise = getArrayOfCards();
    Promise.all([userInfoPromise, cardsPromise])
        .then(([userData, cardsData]) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            currentUserId = userData._id;
            processCards(cardsData, currentUserId);
        })
        .catch((error) => {
            console.error('Ошибка при загрузке данных:', error);
        });
});

enableValidation(config);