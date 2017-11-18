import React, { Component } from 'react';
import api from '@/api/getData';
import { action, computed, runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Popconfirm, Table } from 'antd';

class DataSourceStore {
  @observable data = [];
  @observable title = '123';
  @observable loading = false;

  @action
  async removeIndex(index) {
    this.title += 1;
    await this.startLoading();

    runInAction(() => {
      this.data.splice(index, 1);
    });
  }

  async startLoading() {
    this.loading = true;
    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 1500);
    });
    runInAction(() => {
      this.loading = false;
    });
  }

  @computed
  get dataSource() {
    return this.data.slice();
  }

  @action
  setData(value) {
    this.data = value;
  }

  @action
  addData() {
    this.data = this.data.concat({
      key: this.data.length + 1,
      name: ['Yang lu', 'li qi', 'he mei'][parseInt(Math.random() * 3)],
      age: this.data.length + 1,
      address: 'fsdfsdhklaskl',
    });
  }
}

const dataSource = new DataSourceStore();

@observer
class DeleteIcon extends Component {
  render() {
    return (
      <Popconfirm title="Are you sure u mast delete it?"
                  onConfirm={ () => dataSource.removeIndex(this.props.index) }
                  okText="Yes" cancelText="No">
        <Button>Delete</Button>
      </Popconfirm>
    );
  }
}

@observer
class Test extends Component {
  constructor(props) {
    super(props);
    this.dataStore = dataSource;
  }

  navigate(text) {
    this.props.history.push(`/topics/${text}`);
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a onClick={ () => this.navigate(text) }>{ text }</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <DeleteIcon index={ index } />
      ),
    }];

  componentDidMount() {
    this.fetchData();
  }

  handleAdd() {
    this.dataStore.addData();
  }

  fetchData() {
    this.dataStore.setData([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ]);
  }

  async handleClick() {
    const data = await api.getData('/');

    if (data) {
      this.props.history.replace('/login');
    }
  }

  render() {
    return (
      <div>
        <Button size="small" onClick={ this.handleAdd.bind(this) }> Add </Button>
        <Table loading={ this.dataStore.loading } columns={ this.columns } dataSource={ this.dataStore.dataSource } />
      </div>
    );
  }
}

export default Test;
