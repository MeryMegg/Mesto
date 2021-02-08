/* Переменные */

const userName = document.querySelector("div.root .user-info__name");
const userJob = document.querySelector("div.root .user-info__job");

/* Функции */

//Переберает массив и передает данные в функцию создания карточки
function addCardOutOfTheBox() {
  for (const card of initialCards) {
    placesList.append(createPlaceCard(card));
  }
}

//Создаёт карточку и возвращает ее
function createPlaceCard(data) {
  const cardMarkup = `
  <div class="place-card">
        <div class="place-card__image" style="background-image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>
  `;
  const wrapper = document.createElement("div");
  wrapper.insertAdjacentHTML("afterbegin", cardMarkup);

  const cardElement = wrapper.firstElementChild;
  cardElement.querySelector(".place-card__name").textContent = data.place;
  cardElement.querySelector(
    ".place-card__image"
  ).style.backgroundImage = `url(${data.link})`;

  return cardElement;
}

//Добавляет карточку
function addCard(event) {
  event.preventDefault();

  const place = formAddCard.elements.place;
  const link = formAddCard.elements.link;

  const data = {
    place: place.value,
    link: link.value,
  };

  placesList.append(createPlaceCard(data));

  const popup = formAddCard.closest(".popup");
  togglePopup(popup);
}

//Редактирует профиль
function editProfile(event) {
  event.preventDefault();
  userName.textContent = formEditProfile.elements.name.value;
  userJob.textContent = formEditProfile.elements.job.value;

  const popup = document.querySelector(".popup_is-opened");

  togglePopup(popup);
}

/* Обработчики событий */

//Обработчик события submit
function submitHandler(event) {
  event.preventDefault();

  switch (true) {
    case event.target === formAddCard:
      addCard(event);
      break;

    case event.target === formEditProfile:
      editProfile(event);
      break;
  }
  event.target.reset();
}

// обработчик клика по сердечку
function likeHandler(event) {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
}

// обработчик клика по корзине
function deleteHandler(event) {
  if (event.target.classList.contains("place-card__delete-icon")) {
    event.currentTarget.removeChild(event.target.closest(".place-card"));
  }
}

/* Слушатели событий */

formAddCard.addEventListener("submit", submitHandler);
formEditProfile.addEventListener("submit", submitHandler);

placesList.addEventListener("click", likeHandler);
placesList.addEventListener("click", deleteHandler);

/* Вызовы функций */

addCardOutOfTheBox();