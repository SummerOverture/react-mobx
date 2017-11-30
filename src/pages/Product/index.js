import React, { Component } from 'react';
import { Button, Card, Form, Input, Table } from 'antd';
import PropTypes from 'prop-types';
import withQuery from 'SRC/mixins/query';
import { inject, observer } from 'mobx-react';
import PageHeaders from 'SRC/components/PageHeader';

import style from './product.scss';

const FormItem = Form.Item;

const columns = [
  {
    title: 'pageIndex',
    dataIndex: 'pageIndex',
    key: 'pageIndex',
  }, {
    title: 'pageSize',
    dataIndex: 'pageSize',
    key: 'pageSize',
  }, {
    title: 'productTitle',
    dataIndex: 'productTitle',
    key: 'productTitle',
  }, {
    title: 'productUrl',
    dataIndex: 'productUrl',
    key: 'productUrl',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

@inject('productStore')
@withQuery('productStore')
@Form.create()
@observer
class Product extends Component {
  constructor(props) {
    super(props);
    this.store = props.productStore;
    this.getList = props.getList;

    this.query = this.store.query;
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
  }

  handlePageChange(data) {
    this.store.setQuery(data);
    this.getList();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, search) => {
      if (!err) {
        this.store.setQuery(search);
        this.getList();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <PageHeaders>
          <h2
            className={style['bread-header']}
          >
            产品列表
          </h2>
        </PageHeaders>
        <div className="layout-content">
          <Card
            bordered={false}
            noHovering
          >
            <Form
              layout="inline"
              className="search-form"
              onSubmit={this.handleSubmit}
            >
              <FormItem label="名称">
                {getFieldDecorator('productTitle', {
                  initialValue: this.query.productTitle,
                  rules: [{ required: false, message: '输入产品名称' }],
                })(
                  <Input
                    className="form-item-input"
                    placeholder="产品名称"
                  />,
                )}
              </FormItem>
              <FormItem label="产品url">
                {getFieldDecorator('productUrl', {
                  initialValue: this.query.productUrl,
                  rules: [{ required: false, message: '输入产品名称' }],
                })(
                  <Input
                    className="form-item-input"
                    placeholder="产品地址"
                  />,
                )}
              </FormItem>
              <FormItem>
                <Button
                  loading={this.store.loading}
                  type="primary"
                  htmlType="submit"
                >
                  SEARCH
                </Button>
              </FormItem>
            </Form>
            <Table
              className="table-wrapper"
              columns={columns}
              pagination={{
                defaultCurrent: this.query.pageIndex,
                defaultPageSize: this.query.pageSize,
                total: 50,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: (pageIndex, pageSize) =>
                  this.handlePageChange({ pageIndex, pageSize }),
                onShowSizeChange: (pageIndex, pageSize) =>
                  this.handlePageChange({ pageIndex, pageSize }),
              }}
              loading={this.store.loading}
              dataSource={this.store.dataSource.list.slice()}
            />
          </Card>
        </div>
      </div>
    );
  }
}

Product.WrappedComponent.propTypes = {
  productStore: PropTypes.object.isRequired,
  form: PropTypes.any.isRequired,
  getList: PropTypes.func.isRequired,
};

export default Product;
