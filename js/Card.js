class Card {
  static _template = document
    .querySelector("#card-template")
    .content.querySelector(".place-card");

  constructor(card, createPopupImage) {
    this._card = card;
    this._createPopupImage = createPopupImage;
  }

  createPlaceCard() {
    this._view = Card._template.cloneNode(true);
    this._view.querySelector(
      ".place-card__name"
    ).textContent = this._card.place;
    this._view.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this._card.link})`;
    this.cardElement = this._view;
    this._setEventListeners();
    return this.cardElement;
  }

  _setEventListeners() {
    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this._like);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this._remove);
    this.cardElement
      .querySelector(".place-card__image")
      .addEventListener("click", this._openPopupImage);
  }

  _like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  _openPopupImage = (event) => {
    const url = event.target.style.backgroundImage.slice(5, -2);
    this._createPopupImage(url);
  };

  _remove = (event) => {
    this._removeEventListeners();
    this.cardElement.remove();
  };

  _removeEventListeners() {
    this.cardElement
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);
    this.cardElement
      .querySelector(".place-card__image")
      .removeEventListener("click", this._openPopupImage);
  }
}
