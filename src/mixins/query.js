import React, { Component } from 'react';
import queryStore from 'SRC/store/queryStore';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * 搜索mixin 主要用来持久化搜索条件
 * 注意一定要在引用withQuery之前提供getDataSource方法
 */

const withQuery = (storeName) => (WrappedComponent) => {
  class WithQuery extends Component {
    constructor(props) {
      super(props);
      this.queryStore = queryStore; // 获取queryStore
      this.path = (props.location || window.location).pathname; // 获取当前path
      this[storeName] = props[storeName]; // 获取当前store

      // 获取当前path的query 并赋值进当前store中
      this[storeName].setQuery(this.queryStore.getQueryByPath(this.path));
      this.getList = this.getList.bind(this);
    }

    componentDidMount() {
      this.getList();
    }

    getList(query = this[storeName].query) {
      this.queryStore.setQuery(this.path, query);
      this[storeName].getDataSource(query);
    }

    render() {
      return (
        <WrappedComponent
          getList={this.getList}
          {...this.props}
        />);
    }
  }

  WithQuery.propTypes = {
    location: PropTypes.object,
  };

  WithQuery.defaultProps = {
    location: null,
  };

  WithQuery.displayName = `WithQuery(${getDisplayName(WrappedComponent)})`;
  WithQuery.WrappedComponent = WrappedComponent;

  return hoistNonReactStatic(WithQuery, WrappedComponent);
};

export default withQuery;
