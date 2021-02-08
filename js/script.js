(function () {
  /* Переменные */

  const popup = document.querySelector(".popup");

  const placesList = document.querySelector("div.root .places-list");

  const userName = document.querySelector("div.root .user-info__name");
  const userAbout = document.querySelector("div.root .user-info__about");

  const openPopupCardButton = document.querySelector("#add");
  const openPopupProfileButton = document.querySelector("#edit");

  /* Функции */

  //создание карточки по данным пользователя
  const addCardUser = (card) => cardsList.addCard(card);

  //передает данные в класс userInfo для дальнейшего сохранения и выведения в профиле
  const addUserInfo = (userInfo) => instanceUserInfo.setUserInfo(userInfo);

  //вызывает метод закрытия popup в классе Popup
  const closePopup = () => itstancePopup.closePopup();

  //создает контент для popup по клику на картинку
  const createPopupImage = (url) =>
    itstancePopup.open(itstanceZoomImage.createContent(url));

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
    if (event.target.name === "profile") {
      instanceFormEditProfile.removeEventListeners();
    }
  };

  //Создание экземпляров классов

  //class Popup
  const itstancePopup = new Popup(popup, removeContentPopupListeners);

  //class FormAddCard
  const instanceFormAddCard = new FormAddCard(
    addCardUser,
    setListener,
    removeListener,
    closePopup
  );

  //class FormEditProfile
  const instanceFormEditProfile = new FormEditProfile(
    userName,
    userAbout,
    addUserInfo,
    setListener,
    removeListener,
    closePopup
  );

  //class Card
  const createInstanceCard = (...arg) => new Card(...arg);

  //class UserInfo
  const instanceUserInfo = new UserInfo(userName, userAbout);

  //class FormValidator
  const instanceFormValidator = new FormValidator(errorMessages);

  //class ZoomImage
  const itstanceZoomImage = new ZoomImage();

  //class CardsList
  const cardsList = new CardsList(placesList, createCard, createPopupImage);

  /* Слушатели событий */

  openPopupCardButton.addEventListener("click", () => {
    itstancePopup.open(instanceFormAddCard.createContent());
  });
  openPopupProfileButton.addEventListener("click", () => {
    itstancePopup.open(instanceFormEditProfile.createContent());
  });

  /* Вызовы функций */

  cardsList.render(cards);
})();