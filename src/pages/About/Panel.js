import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';

import style from './panel.scss';

class UiStore {
  @observable contentHeight = 0;
  @observable collapse = false;
  overHeightValue = 60;

  @computed
  get isOverHeight() {
    return this.contentHeight >= this.overHeightValue;
  }

  @computed
  get height() {
    return this.collapse ? `${this.contentHeight + 30}px` : '60px';
  }

  @computed
  get iconType() {
    return this.collapse ? 'up' : 'down';
  }

  @action
  setContentHeight(val) {
    this.contentHeight = val;
  }

  @action
  toggleCollapse() {
    this.collapse = !this.collapse;
  }
}

const uiStore = new UiStore();

const ShowMore = observer(() => {
  const handleClick = () => {
    uiStore.toggleCollapse();
  };
  return (
    <div
      className={style['panel-more']}
      onClick={handleClick}
    >
      <Icon type={uiStore.iconType} />
    </div>);
});

@observer
class Panel extends Component {
  constructor(props) {
    super(props);
    this.a = 1;
    this.uiStore = uiStore;
    this.getRefs = this.getRefs.bind(this);
    this.$refs = {
      children: null,
    };
  }

  componentDidMount() {
    this.setHeight();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.length.length !== this.props.length.length) {
      this.setHeight();
    }
  }

  setHeight() {
    const contentHeight = document.defaultView.getComputedStyle(this.$refs.children, '').height;
    this.uiStore.setContentHeight(parseInt(contentHeight));
  }

  getRefs(e) {
    this.$refs.children = e;
  }

  render() {
    return (
      <div>
        <Card title={this.props.title}>
          <div
            className={style.panel}
            style={{ height: this.uiStore.height }}
          >
            <div
              ref={this.getRefs}
            >
              {this.props.children}
            </div>
            {this.uiStore.isOverHeight ? <ShowMore /> : null}
          </div>
        </Card>
      </div>
    );
  }
}

Panel.propTypes = {
  length: PropTypes.array,
  title: PropTypes.any,
  children: PropTypes.any,
};

Panel.defaultProps = {
  length: [],
  title: false,
  children: '',
};

export default Panel;
