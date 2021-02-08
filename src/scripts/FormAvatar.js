export default class FormAvatar {
  static _template = document
    .querySelector("#avatar-template")
    .content.querySelector(".popup__content");

  constructor(addUserAvatar, setListener, removeListener, renderLoading) {
    this._addUserAvatar = addUserAvatar;
    this._setListener = setListener;
    this._removeListener = removeListener;
    this._renderLoading = renderLoading;
  }

  createContent() {
    this._view = FormAvatar._template.cloneNode(true);
    this._view.querySelector("[name = url]").style.backgroundImage = "";
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

    const link = this._view.querySelector("[name = url]");
    const userInfo = { avatar: link.value };
    this._addUserAvatar(userInfo);

    this._renderLoading(true, this._view.querySelector(".button"));
  };
}
