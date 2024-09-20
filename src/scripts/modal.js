function openModal(elem) {
  elem.classList.add('popup_is-opened');
  elem.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeModalEscape);
};

function closeModalEscape(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
      closeModal(activePopup);
  }
};

function closeModal(elem) {
elem.classList.remove('popup_is-opened');
elem.removeEventListener('click', closeByOverlay);
document.removeEventListener('keydown', closeModalEscape);
};

function closeByOverlay (evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.target === evt.currentTarget) {
      closeModal(activePopup);
  }
};

export {
  openModal,
  closeModal
};