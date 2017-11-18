import React, { Component } from 'react';
import api from '@/api/getData';
import Highcharts from 'highcharts';
import { Button, DatePicker } from 'antd';

class Test extends Component {
  async handleClick() {
    const data = await api.getData('/');

    if (data) {
      this.props.history.replace('/login');
    }
  }

  componentDidMount() {
    Highcharts.chart('container', {
      chart: {
        type: 'bar',
      },
      title: {
        text: '各洲不同时间的人口条形图',
      },
      subtitle: {
        text: '数据来源: Wikipedia.org',
      },
      xAxis: {
        categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '人口总量 (百万)',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' 百万',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            allowOverlap: true,
          },
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      series: [{
        name: '1800 年',
        data: [107, 31, 635, 203, 2],
      }, {
        name: '1900 年',
        data: [133, 156, 947, 408, 6],
      }, {
        name: '2008 年',
        data: [973, 914, 4054, 732, 34],
      }],
    });
  }

  render() {
    return (
      <div>
        <Button type="error" onClick={ () => this.handleClick() }>
          this is slot
        </Button>
        <div id={'container'}> this is a test page 1w</div>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
        />
      </div>
    );
  }
}

export default Test;
