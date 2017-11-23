import { observable, action } from 'mobx';

class Common {
  @observable title = 'login';

  @action
  setName(name) {
    this.title = name;
  }
}

export default new Common();
