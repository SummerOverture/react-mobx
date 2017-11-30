import { action, observable } from 'mobx';

class Common {
  @observable selectMenu = {
    name: '首页',
    url: '',
    openKeys: [],
  };

  @action
  setSelectedMenu(selectMenu) {
    this.selectMenu = Object.assign(this.selectMenu, selectMenu);
  }
}

export default new Common();
