//открытие модального окна
export function openModal(elem) {
  elem.classList.add('popup_is-opened');
  elem.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeModalEscape);
};

//закрытие модального окна
export function closeModal(elem) {
elem.classList.remove('popup_is-opened');
elem.removeEventListener('click', closeByOverlay);
document.removeEventListener('keydown', closeModalEscape);
};

//закрытие по Esc
function closeModalEscape(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
      closeModal(activePopup);
  }
};

//закрытие по оверлею
function closeByOverlay (evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.target === evt.currentTarget) {
      closeModal(activePopup);
  }
};