export default class FormEditProfile {
  static _template = document
    .querySelector("#form-profile-template")
    .content.querySelector(".popup__content");

  constructor(
    userName,
    userAbout,
    addUserInfo,
    setListener,
    removeListener,
    renderLoading
  ) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._addUserInfo = addUserInfo;
    this._setListener = setListener;
    this._removeListener = removeListener;
    this._renderLoading = renderLoading;
  }

  createContent() {
    this._view = FormEditProfile._template.cloneNode(true);
    this._view.querySelector(
      "[name = username]"
    ).value = this._userName.textContent;
    this._view.querySelector(
      "[name = about]"
    ).value = this._userAbout.textContent;
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

    const name = this._view.querySelector("[name = username]");
    const about = this._view.querySelector("[name = about]");
    const userInfo = { name: name.value, about: about.value };
    this._addUserInfo(userInfo);

    this._renderLoading(true, this._view.querySelector(".button"));
  };
}
