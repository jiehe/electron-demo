'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _antdLibTable = require('antd/lib/table');

var _antdLibTable2 = _interopRequireDefault(_antdLibTable);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modalJs = require('./modal.js');

var _modalJs2 = _interopRequireDefault(_modalJs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _antdLibInputNumber = require('antd/lib/input-number');

var _antdLibInputNumber2 = _interopRequireDefault(_antdLibInputNumber);

var _antdLibPopconfirm = require('antd/lib/popconfirm');

var _antdLibPopconfirm2 = _interopRequireDefault(_antdLibPopconfirm);

var _antdLibTag = require('antd/lib/tag');

var _antdLibTag2 = _interopRequireDefault(_antdLibTag);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ctrlJs = require('./ctrl.js');

var _ctrlJs2 = _interopRequireDefault(_ctrlJs);

var App = _react2['default'].createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      columns: this.formatColumns(),
      data: _ctrlJs2['default'].getData(),
      pagination: {}
    };
  },
  renderNum: function renderNum(nums, item, parentIndex) {
    var self = this;
    nums = _lodash2['default'].map(item.spec, 'num') || [];
    return nums.map(function (item, index) {
      return _react2['default'].createElement(
        'div',
        { id: parentIndex + "-" + index, className: 'inputNumber-container' },
        _react2['default'].createElement(_antdLibInputNumber2['default'], { min: 0, value: item, onChange: self.handlerNumChange })
      );
    });
  },
  handlerNumChange: function handlerNumChange(value) {
    var self = this;
    setTimeout(function () {
      var parentNode = (0, _jquery2['default'])(':focus').parents('.inputNumber-container');
      var arr = parentNode.attr('id').split('-');
      self.state.data[arr[0]]['spec'][arr[1]]['num'] = value;
      _ctrlJs2['default'].saveData(self.state.data);
    }, 0);
  },
  renderColor: function renderColor(colors, item) {
    colors = _lodash2['default'].map(item.spec, 'color') || [];
    return colors.map(function (item, index) {
      return _react2['default'].createElement(
        'div',
        { style: { backgroundColor: item, lineHeight: "30px", textAlign: "center", height: "30px" } },
        item
      );
    });
  },
  //删除按钮
  renderRemove: function renderRemove(text, item, index) {
    //return <a href="javascript:;" onClick={this.remove} data-index={index}>删除</a>;
    return _react2['default'].createElement(
      _antdLibPopconfirm2['default'],
      { title: '确定要删除这个商品吗？', onConfirm: this.removeConfirm },
      _react2['default'].createElement(
        'a',
        { href: 'javascript:;', onClick: this.remove, 'data-index': index },
        '删除'
      )
    );
  },
  //删除时选中删除的下标
  remove: function remove(event) {
    var index = event.target.getAttribute('data-index');
    index = parseInt(index);
    this.state.rmIndex = index;
  },
  //删除确认
  removeConfirm: function removeConfirm() {
    _ctrlJs2['default'].removeData(this.state.rmIndex);
    this.getData();
  },
  //format ctime
  renderCtime: function renderCtime(text, item, index) {
    function format(item) {
      if (item < 10) {
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
    return _react2['default'].createElement(
      'span',
      null,
      show
    );
  },
  //格式化标题头
  formatColumns: function formatColumns() {
    var self = this;
    var columns = _lodash2['default'].clone(_ctrlJs2['default'].getColumns());
    _lodash2['default'].each(columns, function (item) {
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
            if (value == 'more') {
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
  addProduct: function addProduct(product) {
    _ctrlJs2['default'].setData(product);
    this.getData();
  },
  getData: function getData() {
    var data = _ctrlJs2['default'].getData();

    this.setState({
      data: data
    });
  },
  render: function render() {
    var state = this.state;
    var pagination = {
      total: state.data.length,
      current: state.pagination.current || 1,
      showSizeChanger: true
    };

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_antdLibTable2['default'], { columns: state.columns, dataSource: state.data, className: 'table', pagination: pagination }),
      _react2['default'].createElement(_modalJs2['default'], { addProduct: this.addProduct })
    );
  }
});

_react2['default'].render(_react2['default'].createElement(App, null), document.getElementById('Table'));

module.exports = App;