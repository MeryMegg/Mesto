class CardsList {
  constructor(
    config,
    container,
    createCard,
    createPopupImage,
    instanceApi,
    renderLoading
  ) {
    this._config = config;
    this._container = container;
    this._createCard = createCard;
    this._createPopupImage = createPopupImage;
    this._instanceApi = instanceApi;
    this._renderLoading = renderLoading;
  }

  addCard(card) {
    this._container.append(
      this._createCard(
        card,
        this._config,
        this._createPopupImage,
        this._instanceApi
      )
    );
  }

  saveCard = (card) => {
    this._instanceApi
      .createCards(card)
      .then((res) => {
        this.addCard(res);
        this._renderLoading(false);
      })
      .catch((err) => {
        /**
         * Можно лучше:
         * Перенести this._renderLoading(false); в finally
         */
        this._renderLoading(false);
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  };

  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };
}
