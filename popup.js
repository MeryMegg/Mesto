/* Переменные */

const addCardPopup = document.querySelector(".popup_type_add-card");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const imageZoomPopup = document.querySelector(".popup_type_image");

const closePopupCardButton = document.querySelector("#card");
const closePopupProfileButton = document.querySelector("#profile");
const closePopupImageButton = document.querySelector("#img");

const openPopupCardButton = document.querySelector("#add");
const openPopupProfileButton = document.querySelector("#edit");
const placesList = document.querySelector("div.root .places-list");

/* Функции */

//Открывает и закрывает popup
function togglePopup(popup) {
  popup.classList.toggle("popup_is-opened");
}

//Обновляет форму при открытии
function updateForm(form) {
  const submit = form.querySelector(".button");
  clearErrors(form);
  if (form === formEditProfile) {
    setSubmitButtonState(submit, true);
  } else if (form === formAddCard) {
    form.reset();
    setSubmitButtonState(submit, false);
  }
}

//Обнуляет ошибки
function clearErrors(form) {
  const inputs = [...form.querySelectorAll(".popup__input")];
  inputs.forEach((input) => {
    const errorElem = input
      .closest(".popup__form")
      .querySelector(`#${input.name}-error`);
    errorElem.textContent = "";
  });
}

/* Обработчики */

//Обработчик клика по кнопке открывающей popup с формой добавления карточек
function handleOpenPopupCardButtonClick() {
  updateForm(formAddCard);
  togglePopup(addCardPopup);
}

//Обработчик клика по кнопке открывающей popup с формой редактирования профиля
function handleOpenPopupProfileButtonClick() {
  formEditProfile.elements.name.value = userName.textContent;
  formEditProfile.elements.job.value = userJob.textContent;
  togglePopup(editProfilePopup);
  updateForm(formEditProfile);
}

//Обработчик клика по кнопке открывающей popup с увеличенной фотографией
function handleOpenPopupImageButtonClick(event) {
  if (event.target.classList.contains("place-card__image")) {
    const img = document.querySelector(".popup__image");
    img.src = event.target.style.backgroundImage.slice(5, -2);
    togglePopup(imageZoomPopup);
  }
}

//Обработчик нажатия на клавишу
function keydownHandler(event) {
  if (event.keyCode === 27) {
    const elem = document.querySelector(".popup_is-opened");
    elem.classList.remove("popup_is-opened");
  }
}

/* Слушатели */

openPopupCardButton.addEventListener("click", handleOpenPopupCardButtonClick);
closePopupCardButton.addEventListener("click", () => togglePopup(addCardPopup));

openPopupProfileButton.addEventListener(
  "click",
  handleOpenPopupProfileButtonClick
);
closePopupProfileButton.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);

placesList.addEventListener("click", handleOpenPopupImageButtonClick);
closePopupImageButton.addEventListener("click", () =>
  togglePopup(imageZoomPopup)
);

document.addEventListener("keydown", keydownHandler);

