import { config } from "./config.js";
export default class CardsList {
  constructor(
    config,
    container,
    createCard,
    createPopupImage,
    instanceApi,
    renderLoading,
    cardTemplate
  ) {
    this._config = config;
    this._container = container;
    this._createCard = createCard;
    this._createPopupImage = createPopupImage;
    this._instanceApi = instanceApi;
    this._renderLoading = renderLoading;
    this._cardTemplate = cardTemplate;
  }

  addCard(card) {
    this._container.append(
      this._createCard(
        card,
        this._config,
        this._createPopupImage,
        this._instanceApi,
        this._cardTemplate
      )
    );
  }

  saveCard = (card) => {
    this._instanceApi
      .createCards(card)
      .then((res) => {
        this.addCard(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      })
      .finally(() => this._renderLoading(false));
  };

  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };
}
