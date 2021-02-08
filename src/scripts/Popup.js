export default class Popup {
  constructor(popup, removeContentPopupListeners) {
    this._popup = popup;
    this._removeContentPopupListeners = removeContentPopupListeners;
  }

  open(content) {
    this._popup.append(content);
    this._setEventListeners();
    this._togglePopup();
  }

  _togglePopup = () => {
    this._popup.classList.toggle("popup_is-opened");
  };

  _setEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", this.closePopup);
  }

  _removeEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .removeEventListener("click", this.closePopup);
  }

  closePopup = () => {
    if (
      this._popup
        .querySelector(".popup__content")
        .classList.contains("popup__content_type_form")
    ) {
      const form = this._popup.querySelector(".popup__form");
      this._removeContentPopupListeners(form);
    }
    this._removeEventListeners();
    this._popup.innerHTML = "";
    this._togglePopup();
  };
}
