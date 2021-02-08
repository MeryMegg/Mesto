//import { serverUrl } from "./config.js";
export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._pathCards = config.pathCards;
    this._pathUsersMe = config.pathUsersMe;
    this._pathLike = config.pathLike;
    this._pathAvatar = config.pathAvatar;
    this._headers = config.headers;
  }

  getCards() {
    return this._getData(`${this._baseUrl}/${this._pathCards}`);
  }

  createCards(data) {
    return this._createData(`${this._baseUrl}/${this._pathCards}`, data);
  }

  getUsersInfo() {
    return this._getData(`${this._baseUrl}/${this._pathUsersMe}`);
  }

  updateUserInfo(data) {
    return this._updateData(`${this._baseUrl}/${this._pathUsersMe}`, data);
  }

  updateUserAvatar(data) {
    return this._updateData(
      `${this._baseUrl}/${this._pathUsersMe}/${this._pathAvatar}`,
      data
    );
  }

  putLike(id) {
    return this._putData(
      `${this._baseUrl}/${this._pathCards}/${this._pathLike}/${id}`
    );
  }

  deleteCard(id) {
    return this._deleteData(`${this._baseUrl}/${this._pathCards}/${id}`);
  }

  deleteLike(id) {
    return this._deleteData(
      `${this._baseUrl}/${this._pathCards}/${this._pathLike}/${id}`
    );
  }

  _getData(url) {
    return fetch(url, {
      headers: this._headers,
    }).then((res) => this._requestHandler(res));
  }

  _createData(url, card) {
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => this._requestHandler(res));
  }

  _updateData(url, data) {
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._requestHandler(res));
  }

  _putData(url) {
    return fetch(url, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._requestHandler(res));
  }

  _deleteData(url) {
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
