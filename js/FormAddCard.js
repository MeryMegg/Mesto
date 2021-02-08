class FormAddCard {
  static _template = document
    .querySelector("#form-card-template")
    .content.querySelector(".popup__content");

  constructor(addCardUser, setListener, removeListener, closePopup) {
    this._addCardUser = addCardUser;
    this._setListener = setListener;
    this._removeListener = removeListener;
    this._closePopup = closePopup;
  }

  createContent() {
    this._view = FormAddCard._template.cloneNode(true);
    this._view.querySelector("[name = place]").value = "";
    this._view.querySelector("[name = link]").style.backgroundImage = "";
    this.cardElement = this._view;
    this._setEventListeners();
    return this.cardElement;
  }

  _setEventListeners() {
    this._view
      .querySelector(".popup__form")
      .addEventListener("submit", this._submitHandler);
    this._setListener(this.cardElement.querySelector(".popup__form"));
  }

  removeEventListeners() {
    this._view
      .querySelector(".popup__form")
      .removeEventListener("submit", this._submitHandler);
    this._removeListener(this.cardElement.querySelector(".popup__form"));
  }

  _submitHandler = (event) => {
    event.preventDefault();

    const place = this._view.querySelector("[name = place]");
    const link = this._view.querySelector("[name = link]");
    const card = { place: place.value, link: link.value };

    this._addCardUser(card);

    this._closePopup();
  };
}
