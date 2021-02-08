export default class ZoomImage {
  static _template = document
    .querySelector("#image-template")
    .content.querySelector(".popup__content");

  createContent(url) {
    this._view = ZoomImage._template.cloneNode(true);
    this._view.querySelector(".popup__image").src = url;
    this.cardElement = this._view;
    return this.cardElement;
  }
}
