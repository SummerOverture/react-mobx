import { action, observable, runInAction } from 'mobx';
import api from 'SRC/api/product';

class Common {
  initialQuery() {
    return {
      pageIndex: 1,
      pageSize: 10,
      productTitle: '',
      productUrl: '',
    };
  }

  @observable dataSource = {
    list: [],
    total: 0,
  };
  @observable query = this.initialQuery();
  @observable loading = false;

  @action
  async getDataSource(search = this.query) {
    this.loading = true;
    try {
      const data = await api.getList(search);
      runInAction(() => {
        this.loading = false;
        this.setDataSource(data);
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
        this.setDataSource();
      });
    }
  }

  @action
  setQuery(query) {
    this.query = Object.assign(this.query, query);
  }

  @action
  setDataSource(data) {
    this.dataSource = data || {
      list: [],
      total: 0,
    };
  }
}

export default new Common();
