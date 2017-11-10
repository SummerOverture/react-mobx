import { observable, action } from 'mobx';

class AuthStore {
  @observable title = 'login';

  @action
  setName(name) {
    this.title = name;
  }
}

export default new AuthStore();
