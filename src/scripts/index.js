import "../pages/style.css";
import Api from "./Api.js";
import Card from "./Card.js";
import CardsList from "./CardsList.js";
import { config } from "./config.js";
import { errorMessages } from "./errorMessages.js";
import FormAddCard from "./FormAddCard.js";
import FormAvatar from "./FormAvatar.js";
import FormEditProfile from "./FormEditProfile.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import ZoomImage from "./ZoomImage.js";

(function () {
  /* Переменные */

  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".place-card");

  const popup = document.querySelector(".popup");

  const placesList = document.querySelector("div.root .places-list");

  const userName = document.querySelector("div.root .user-info__name");
  const userAbout = document.querySelector("div.root .user-info__about");
  const userAvatar = document.querySelector("div.root .user-info__photo");

  const openPopupCardButton = document.querySelector("#add");
  const openPopupProfileButton = document.querySelector("#edit");
  const openFormAvatar = document.querySelector(".user-info__photo");

  /* Функции */

  //создание карточки по данным пользователя
  const addCardUser = (card) => cardsList.saveCard(card);

  //передает данные в класс userInfo для дальнейшего сохранения и выведения в профиле
  const addUserInfo = (userInfo) => instanceUserInfo.updateUserInfo(userInfo);

  //передает данные о новом аватаре в класс userInfo для дальнейшего сохранения и выведения в профиле
  const addUserAvatar = (userInfo) =>
    instanceUserInfo.updateUserAvatar(userInfo);

  //вызывает метод закрытия popup в классе Popup
  const closePopup = () => instancePopup.closePopup();

  //создает контент для popup по клику на картинку
  const createPopupImage = (url) =>
    instancePopup.open(instanceZoomImage.createContent(url));

  //вызывает метод класса Card для создания карточки
  const createCard = (...arg) => createInstanceCard(...arg).createPlaceCard();

  //вызывает метод класса FormValidator для добавления слушателей
  const setListener = (form) => instanceFormValidator.setEventListeners(form);

  //вызывает метод класса FormValidator для снятия слушателей
  const removeListener = (form) =>
    instanceFormValidator.removeEventListeners(form);

  //вызывает методы классов FormAddCard или FormEditProfile для снятия слушателей при закрытии popup по крестику
  const removeContentPopupListeners = (form) => {
    if (form.name === "new") {
      instanceFormAddCard.removeEventListeners();
    }
    if (form.name === "profile") {
      instanceFormEditProfile.removeEventListeners();
    }
    if (form.name === "avatar") {
      instanceFormAvatar.removeEventListeners();
    }
  };

  //загрузка
  const renderLoading = (isLoading, button) => {
    if (isLoading) {
      button.textContent = "Загрузка...";
    } else {
      closePopup();
    }
  };

  //Создание экземпляров классов

  //class Popup
  const instancePopup = new Popup(popup, removeContentPopupListeners);

  //class FormAddCard
  const instanceFormAddCard = new FormAddCard(
    addCardUser,
    setListener,
    removeListener,
    renderLoading
  );

  //class FormAvatar
  const instanceFormAvatar = new FormAvatar(
    addUserAvatar,
    setListener,
    removeListener,
    renderLoading
  );

  //class FormEditProfile
  const instanceFormEditProfile = new FormEditProfile(
    userName,
    userAbout,
    addUserInfo,
    setListener,
    removeListener,
    renderLoading
  );

  //class Api
  const instanceApi = new Api(config);

  //class UserInfo
  const instanceUserInfo = new UserInfo(
    config,
    userName,
    userAbout,
    userAvatar,
    instanceApi,
    renderLoading
  );

  //class Card
  const createInstanceCard = (...arg) => new Card(...arg);

  //class FormValidator
  const instanceFormValidator = new FormValidator(errorMessages);

  //class ZoomImage
  const instanceZoomImage = new ZoomImage();

  //class CardsList
  const cardsList = new CardsList(
    config,
    placesList,
    createCard,
    createPopupImage,
    instanceApi,
    renderLoading,
    cardTemplate
  );

  /* Слушатели событий */

  openPopupCardButton.addEventListener("click", () => {
    instancePopup.open(instanceFormAddCard.createContent());
  });

  openFormAvatar.addEventListener("click", () => {
    instancePopup.open(instanceFormAvatar.createContent());
  });

  openPopupProfileButton.addEventListener("click", () => {
    instancePopup.open(instanceFormEditProfile.createContent());
  });

  /* Вызовы функций */
  instanceApi
    .getUsersInfo()
    .then((res) => {
      instanceUserInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
      alert("Что-то пошло не так... Повторите попытку...");
    });

  instanceApi
    .getCards()
    .then((res) => {
      console.log(res)
      cardsList.render(res);
    })
    .catch((err) => {
      console.log(err);
      alert("Что-то пошло не так... Повторите попытку...");
    });
})();

/**
 * Отлично, помимо обязательных правок были сделаны дополнительные.
 *
 * Работа принята, желаю вам успехов в дальнейшем обучении!
 *
 * Можно лучше:
 * Перенести this._renderLoading(false); в finally +++
 */

/*
Отличная работа, рефакторинг выполнен, необходимые классы созданы и приложение продолжает работать корректно.
Однако к организации кода есть несколько замечаний:

Надо испарвить:
- в классе Card не использовать при удалении карточки селектор .places-list   ++++
- в классе FormValidator захардкожены поля двух форм, хотя без этого можно легко обойтись ++++
- разделить класс ContentPopup на несколько раздельны, чтобы они соответсвовали принципу единственной ответсвенности ++++
- когда код расположен в разных файлах, его нужно  ++++
	заключать в модули, т.к. если файлов будет много, то в разных
	файлах могут появится функции или переменные с одинаковыми именами,
	они будут переопределять друг друга. Модуль должен предоставлять
	наружу только минимально необходимый api
	Для создании модулей можно воспользоваться IIFE, подробнее:
	https://learn.javascript.ru/closures-module
	https://habr.com/ru/company/ruvds/blog/419997/
	Нужно обернуть в модуль содержимое файла script.js
	Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
	и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов

Можно лучше:
- this._createContentPopup не используется в классе CardsList +++
- массив cards лучше передавать не в конструктор, а в метод render +++

*/

/*
  Вы хорошо поработали, все замечания исправлены

  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!

*/
