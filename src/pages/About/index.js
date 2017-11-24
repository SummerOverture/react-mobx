import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PageHeader from 'SRC/components/PageHeader';

import Panel from './Panel';

const T = () => <div>hello TITLE</div>;

@inject('authStore')
@observer
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: [1, 2, 3, 4, 5],
    };
  }

  componentDidMount() {
    this.setLength();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  setLength() {
    this.timer = setInterval(() => {
      this.setState((pre) => ({
        a: pre.a.concat(pre.a.length + 1),
      }));
    }, 2000);
  }

  render() {
    return (
      <div>
        <PageHeader />
        <div className="layout-content">
          <Panel
            length={this.state.a}
            title={<T />}
          >
            <div>
              {
                this.state.a.map((item, index) => (
                  <div key={item}>hello kitty{index}</div>
                ))
              }
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default About;
