import Table from 'antd/lib/table';
import React from 'react';
import Modal from './modal.js';
import _ from 'lodash';
import InputNumber from 'antd/lib/input-number';
import Popconfirm from 'antd/lib/popconfirm';
import Tag from 'antd/lib/tag';
import $ from 'jquery';
import ctrl from './ctrl.js';


let App = React.createClass({
  getInitialState() {
    return {
      columns: this.formatColumns(),
      data: ctrl.getData(),
      pagination: {}
    }
  },
  renderNum(nums, item, parentIndex) {
    var self = this;
    nums = _.map(item.spec, 'num') || [];
    return nums.map(function(item, index) {
      return (
        <div id={parentIndex +"-"+index} className="inputNumber-container">
          <InputNumber min={0} value={item} onChange={self.handlerNumChange} />
        </div>
      )
    })
  },
  handlerNumChange(value) {
    let self = this;
    setTimeout(function() {
      let parentNode = $(':focus').parents('.inputNumber-container');
      let arr = parentNode.attr('id').split('-');
      self.state.data[arr[0]]['spec'][arr[1]]['num'] = value;
      ctrl.saveData(self.state.data);
    }, 0);
  },
  renderColor(colors, item) {
    colors = _.map(item.spec, 'color') || [];
    return colors.map(function(item, index) {
      return (
        <div style={{backgroundColor: item,lineHeight:"30px",textAlign:"center",height:"30px"}}>
          {item}
        </div>
      )
    })
  },
  //删除按钮
  renderRemove(text, item, index) {
    //return <a href="javascript:;" onClick={this.remove} data-index={index}>删除</a>;
    return <Popconfirm title="确定要删除这个商品吗？" onConfirm={this.removeConfirm}>
      <a href="javascript:;" onClick={this.remove} data-index={index}>删除</a>
    </Popconfirm>
  },
  //删除时选中删除的下标
  remove(event) {
    let index = event.target.getAttribute('data-index');
    index = parseInt(index);
    this.state.rmIndex = index;
  },
  //删除确认
  removeConfirm() {
    ctrl.removeData(this.state.rmIndex);
    this.getData();
  },
  //format ctime
  renderCtime(text, item, index) {
    function format(item) {
      if(item < 10) {
        item = '0' + item;
      }
      return item;
    }
    var time = new Date(text);
    var year = time.getFullYear();
    var month = format(time.getMonth() + 1);
    var day = format(time.getDate());
    var hours = format(time.getHours());
    var min = format(time.getMinutes());
    var second = format(time.getSeconds());
    var show = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + second;
    return <span>{show}</span>
  },
  //格式化标题头
  formatColumns() {
    let self = this;
    let columns = _.clone(ctrl.getColumns());
    _.each(columns, function (item) {
      switch (item.key) {
        case 'nums':
          item.render = self.renderNum;
          //item.sorter = function (a, b) {
          //  return a.num - b.num;
          //};
          break;
        case 'remove':
          item.render = self.renderRemove;
          break;
        case 'name':
          item.onFilter = function (value, record) {
            if(value == 'more') {
              return record.spec.length > 1;
            } else {
              return record.spec.length == 1;
            }
          };
          break;
        case 'ctime':
          item.render = self.renderCtime;
          item.sorter = function (a, b) {
            return a.ctime - b.ctime;
          };
          break;
        case 'colors':
          item.render = self.renderColor;
          break;
      }
    });
    return columns;
  },
  addProduct(product) {
    ctrl.setData(product);
    this.getData();
  },
  getData() {
    var data = ctrl.getData();

    this.setState({
      data: data
    })
  },
  render() {
    let state = this.state;
    let pagination = {
      total: state.data.length,
      current: state.pagination.current || 1,
      showSizeChanger: true
    };

    return <div>
      <Table columns={state.columns} dataSource={state.data} className='table' pagination={pagination} />
      <Modal addProduct={this.addProduct}/>
    </div>
  }
});


React.render(
  <App />
  , document.getElementById('Table'));

module.exports = App;