/* Переменные */

const formAddCard = document.forms.new;
const formEditProfile = document.forms.profile;

const errorMessages = {
  empty: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  wrongUrl: "Здесь должна быть ссылка",
};

/* Функции */

//Проверяет поля и выбирает ошибку
function isValidate(input) {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false;
  }

  if (input.type !== "url" && input.type !== "submit") {
    if (input.validity.tooShort || input.value.length > 30) {
      input.setCustomValidity(errorMessages.wrongLength);
      return false;
    }
  }

  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false;
  }

  return input.checkValidity();
}

// Активирует и деактивирует кнопку submit
function setSubmitButtonState(submit, state) {
  if (state) {
    submit.removeAttribute("disabled");
    submit.classList.add(`popup__button_enable`);
    submit.classList.remove(`popup__button_disable`);
  } else {
    submit.setAttribute("disabled", true);
    submit.classList.add(`popup__button_disable`);
    submit.classList.remove(`popup__button_enable`);
  }
}

//Добавляет или удаляет ошибку
function isFieldValid(input) {
  const errorElem = input
    .closest(".popup__form")
    .querySelector(`#${input.name}-error`);
  const valid = isValidate(input);
  errorElem.textContent = input.validationMessage;
  return valid;
}

/* Обработчики событий */

//Обработчик события input
function inputHandler(event) {
  const submit = event.currentTarget.querySelector(".button");
  const inputs = [...event.currentTarget.elements];

  isFieldValid(event.target);

  if (inputs.every(isValidate)) {
    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);
  }
}

/* Слушатели */

formAddCard.addEventListener("input", inputHandler, true);
formEditProfile.addEventListener("input", inputHandler, true);
