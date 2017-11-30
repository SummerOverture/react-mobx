import { action, observable } from 'mobx';
import Storage from 'SRC/utils/sessionStore';

class Query {
  queryStorage = new Storage('query');
  @observable query = this.queryStorage.getObj() || {};

  @action
  setQuery(path, query) {
    this.query = query;
    this.queryStorage.setItem(path, query);
  }

  @action
  getQueryByPath(path) {
    return this.query[path] || {};
  }

  clearQuery() {
    this.queryStorage.clearStore();
  }
}

export default new Query();
