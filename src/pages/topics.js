import React, { Component } from 'react';
import api from '@/api/getData';

import { Button, Table, Icon } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (text) => <a href="#">{ text }</a>,
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
  render: (text, record) => (
    <span>
      <a href="#">Action 一 { record.name }</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 123,
      dataSource: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState((pre) => ({
      title: 45562,
      dataSource: pre.dataSource.concat([
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
      ]),
      loading: !pre.loading,
    }));
    setTimeout(() => {
      console.log(this);
    });
  }

  async handleClick() {
    const data = await api.getData('/');

    if (data) {
      this.props.history.replace('/login');
    }
  }

  render() {
    const data = this.state.dataSource;
    return (
      <div>
        <Table columns={ columns } dataSource={ data } />
        <Button type="error" onClick={ () => this.handleClick() }>
          { this.state.title }
        </Button>
      </div>
    );
  }
}

export default Test;
