class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userInfo = {};
  }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
    this._updateUserInfo();
  }

  _updateUserInfo() {
    this._userName.textContent = this._userInfo.username;
    this._userAbout.textContent = this._userInfo.about;
  }
}
