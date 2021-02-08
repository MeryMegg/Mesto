class FormValidator {
  constructor(errorMessages) {
    this._errorMessages = errorMessages;
    this._inputHandler = this._inputHandler.bind(this);
  }

  setEventListeners = (form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) =>
      input.addEventListener("input", this._inputHandler)
    );
  };

  removeEventListeners = (form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) =>
      input.removeEventListener("input", this._inputHandler)
    );
  };

  //обработчик событий
  _inputHandler(event) {
    this._submit = event.target
      .closest(".popup__form")
      .querySelector(".button");
    const inputs = [...event.target.closest(".popup__form").elements].filter(
      (input) => input.type !== "submit"
    );

    this.isFieldValid(event.target);

    if (inputs.every(this._isValidate)) {
      this.setSubmitButtonState(this._submit, true);
    } else {
      this.setSubmitButtonState(this._submit, false);
    }
  }

  //Добавляет или удаляет ошибку
  isFieldValid(input) {
    const errorElem = input
      .closest(".popup__form")
      .querySelector(`#${input.name}-error`);
    const valid = this._isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  //Проверяет поля и выбирает ошибку
  _isValidate(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.empty);
      return false;
    }

    if (input.type !== "url") {
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
  setSubmitButtonState(submit, state) {
    if (state) {
      this._submit.removeAttribute("disabled");
      this._submit.classList.add(`popup__button_enable`);
      this._submit.classList.remove(`popup__button_disable`);
    } else {
      this._submit.setAttribute("disabled", true);
      this._submit.classList.add(`popup__button_disable`);
      this._submit.classList.remove(`popup__button_enable`);
    }
  }
}
