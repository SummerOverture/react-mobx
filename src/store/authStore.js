import { observable, action } from 'mobx';
import auth from '@/api/auth';

class Auth {
  @observable nickName = '';
  @observable authState = 401;

  @action
  checkAuth() {
    return auth
      .checkAuth()
      .then((userInfo) => {
        this.setAuthState(200);
        this.setUserInfo(userInfo);
      })
      .catch(() => {
        this.setAuthState(401);
      });
  }

  @action
  setUserInfo(userinfo) {
    this.nickName = userinfo.nickName;
  }

  @action
  setAuthState(status) {
    this.authState = status;
  }

  @action
  setUnAuth() {
    this.setAuthState(401);
  }

  @action
  setExpireAuth() {
    this.setAuthState(403);
  }
}

export default new Auth();
