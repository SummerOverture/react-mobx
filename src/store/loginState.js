import { observable, action } from 'mobx';

class AuthStore {
  @observable login = false;

  @action
  setLogin(val) {
    this.login = val;
  }
}

export default new AuthStore();
