function openPopup(popup) {
  popup.classList.add('popup_is-opened');  
  document.addEventListener('keydown', closePopupEscape); 
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', closePopupEscape); 
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); 
    closePopup(popup); 
  }
};

function closePopupButton(evt) {
  if (evt.target === evt.target.closest('.popup__close')) {
    const popup = document.querySelector('.popup_is-opened'); 
    closePopup(popup); 
  }
};

function closePopupOverlay(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (popup === evt.target) {    
    closePopup(popup); 
  }};

export {
  openPopup,
  closePopup,
  closePopupEscape,
  closePopupButton,
  closePopupOverlay
};