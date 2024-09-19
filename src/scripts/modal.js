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
}

export { openPopup, closePopup, closePopupEscape }; 