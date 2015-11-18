'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _antdLibModal = require('antd/lib/modal');

var _antdLibModal2 = _interopRequireDefault(_antdLibModal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdLibCheckbox = require('antd/lib/checkbox');

var _antdLibCheckbox2 = _interopRequireDefault(_antdLibCheckbox);

var _antdLibRadio = require('antd/lib/radio');

var _antdLibRadio2 = _interopRequireDefault(_antdLibRadio);

var _antdLibRadioGroup = require('antd/lib/radio/group');

var _antdLibRadioGroup2 = _interopRequireDefault(_antdLibRadioGroup);

var _antdLibInputNumber = require('antd/lib/input-number');

var _antdLibInputNumber2 = _interopRequireDefault(_antdLibInputNumber);

var App = _react2['default'].createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      visible: false,
      product: {
        name: '',
        spec: [{
          color: "",
          num: ""
        }]
      }
    };
  },
  showModal: function showModal() {
    this.setState({
      visible: true,
      product: {
        name: '',
        spec: [{
          color: "",
          num: ""
        }]
      }
    });
  },
  handleOk: function handleOk() {
    this.state.product.ctime = new Date().getTime();
    this.props.addProduct(this.state.product);
    this.setState({
      confirmLoading: false,
      visible: false
    });
  },
  handleCancel: function handleCancel() {
    this.setState({
      visible: false
    });
  },
  handleChange: function handleChange(event) {
    var target = event.target;
    var attr = target.getAttribute('data-attr');

    if (attr == 'name') {
      this.state.product.name = event.target.value;
    } else {
      var index = target.getAttribute('data-index');
      index = parseInt(index);
      if (attr == 'num') {
        this.state.product.spec[index][attr] = parseInt(event.target.value);
      } else {
        this.state.product.spec[index][attr] = event.target.value;
      }
    }
    this.setState({ product: this.state.product });
  },
  addSpec: function addSpec() {
    var product = this.state.product;
    product.spec.push({
      color: "",
      num: ""
    });
    this.setState(product);
  },
  removeSpec: function removeSpec() {
    var product = this.state.product;
    var target = event.target;
    var index = target.getAttribute('data-index');
    index = parseInt(index);
    product.spec.splice(index, 1);
    this.setState({ product: product });
  },
  render: function render() {
    var product = this.state.product;
    var spec = product.spec;
    var self = this;

    var specItem = spec.map(function (item, index) {

      var operation = _react2['default'].createElement(
        'div',
        { className: 'col-3 col-offset-1' },
        _react2['default'].createElement(
          'button',
          { type: 'button', className: 'ant-btn ant-btn-primary ant-btn-lg', 'data-index': index, onClick: self.removeSpec },
          '删除'
        )
      );
      if (index == spec.length - 1) {
        operation = _react2['default'].createElement(
          'div',
          { className: 'col-3 col-offset-1' },
          _react2['default'].createElement(
            'button',
            { type: 'button', className: 'ant-btn ant-btn-primary ant-btn-lg', onClick: self.addSpec },
            '添加'
          )
        );
      };

      return _react2['default'].createElement(
        'div',
        { className: 'ant-form-item' },
        _react2['default'].createElement(
          'label',
          { htmlFor: 'color', className: 'col-6', required: true },
          '商品颜色：'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-5' },
          _react2['default'].createElement('input', { className: 'ant-input', type: 'text', 'data-attr': 'color', 'data-index': index,
            placeholder: '输入商品颜色', value: item.color, onChange: self.handleChange })
        ),
        _react2['default'].createElement(
          'label',
          { htmlFor: 'num', className: 'col-4', required: true },
          '商品数量：'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-5' },
          _react2['default'].createElement('input', { className: 'ant-input', type: 'number', 'data-attr': 'num', 'data-index': index,
            placeholder: '输入商品数量', value: item.num, onChange: self.handleChange })
        ),
        operation
      );
    });

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'button',
        { className: 'ant-btn ant-btn-primary', onClick: this.showModal },
        '添加商品'
      ),
      _react2['default'].createElement(
        _antdLibModal2['default'],
        { title: '添加商品', visible: this.state.visible,
          confirmLoading: this.state.confirmLoading, onOk: this.handleOk, onCancel: this.handleCancel },
        _react2['default'].createElement(
          'form',
          { className: 'ant-form-horizontal' },
          _react2['default'].createElement(
            'div',
            { className: 'ant-form-item' },
            _react2['default'].createElement(
              'label',
              { htmlFor: 'name', className: 'col-6', required: true },
              '商品名：'
            ),
            _react2['default'].createElement(
              'div',
              { className: 'col-14' },
              _react2['default'].createElement('input', { value: product.name, className: 'ant-input', type: 'text', 'data-attr': 'name', placeholder: '请输入商品名称', onChange: this.handleChange })
            )
          ),
          specItem
        )
      )
    );
  }
});
module.exports = App;