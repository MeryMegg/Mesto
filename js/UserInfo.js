class UserInfo {
  constructor(
    config,
    userName,
    userAbout,
    userAvatar,
    instanceApi,
    renderLoading
  ) {
    this._config = config;
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
    this._instanceApi = instanceApi;
    this._renderLoading = renderLoading;

    this._userInfo = {};
  }

  updateUserInfo = (userInfo) => {
    this._instanceApi
      .updateUserInfo({ name: userInfo.name, about: userInfo.about })
      .then((res) => {
        this.setUserInfo(res);
        this._renderLoading(false);
      })
      .catch((err) => {
        this._renderLoading(false);
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  };

  updateUserAvatar = (userInfo) => {
    this._instanceApi
      .updateUserAvatar({ avatar: userInfo.avatar })
      .then((res) => {
        this.setUserInfo(res);
        this._renderLoading(false);
      })
      .catch((err) => {
        this._renderLoading(false);
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  };

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
    this._updateUserProfileInfo();
    this._config.myId = this._userInfo._id;
  }

  _updateUserProfileInfo() {
    this._userName.textContent = this._userInfo.name;
    this._userAbout.textContent = this._userInfo.about;
    this._userAvatar.style.backgroundImage = `url(${this._userInfo.avatar})`;
  }
}
