import React, { Component } from 'react';
import api from '@/api/getData';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Popconfirm, Table } from 'antd';

class DataSourceStore {
  @observable dataSource = [];
  @observable title = '123';

  @action
  removeIndex(index) {
    console.log(index);
  }

  @action
  setData(value) {
    this.dataSource = value;
  }
}

const dataSource = new DataSourceStore();

@observer
class DeleteIcon extends Component {
  render() {
    return (
      <Popconfirm title="Are you sure u mast delete it?"
                  onConfirm={ dataSource.removeIndex(1) }
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

  columns = [{
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

  fetchData() {
    console.log(this.dataStore);
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
        <Table columns={ this.columns } dataSource={ this.dataStore.dataSource } />
        <Button type="error" onClick={ () => this.handleClick() }>
          { this.dataStore.title }
        </Button>
      </div>
    );
  }
}

export default Test;
