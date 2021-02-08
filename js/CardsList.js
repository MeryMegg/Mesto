class CardsList {
  constructor(container, createCard, createPopupImage) {
    this._container = container;
    this._createCard = createCard;
    this._createPopupImage = createPopupImage;
  }

  addCard(card) {
    this._container.append(this._createCard(card, this._createPopupImage));
  }

  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };
}
