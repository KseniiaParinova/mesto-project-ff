// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });
  return cardElement;
}

function addCard(cardElement) {
  cardList.append(cardElement);
}

function deleteCard(button) {
  button.closest(".card").remove();
}

initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard);
  addCard(cardElement);
});
