
import Modal from 'antd/lib/modal';
import React from 'react';
import Checkbox from 'antd/lib/checkbox';
import Radio from 'antd/lib/radio';
import RadioGroup from 'antd/lib/radio/group';
import InputNumber from 'antd/lib/input-number';


var App = React.createClass({
  getInitialState() {
    return {
      visible: false,
      product: {
        name: '',
        spec: [
          {
            color: "",
            num: ""
          }
        ]
      }
    };
  },
  showModal() {
    this.setState({
      visible: true,
      product: {
        name: '',
        spec: [
          {
            color: "",
            num: ""
          }
        ]
      }
    });
  },
  handleOk() {
    this.state.product.ctime = new Date().getTime();
    this.props.addProduct(this.state.product);
    this.setState({
      confirmLoading: false,
      visible: false
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  handleChange(event) {
    let target = event.target;
    let attr = target.getAttribute('data-attr');

    if(attr == 'name') {
      this.state.product.name = event.target.value;
    } else {
      let index = target.getAttribute('data-index');
      index = parseInt(index);
      if(attr == 'num') {
        this.state.product.spec[index][attr] =  parseInt(event.target.value);
      } else {
        this.state.product.spec[index][attr] =  event.target.value;
      }
    }
    this.setState({product: this.state.product});
  },
  addSpec() {
    let product = this.state.product;
    product.spec.push({
      color: "",
      num: ""
    });
    this.setState(product);

  },
  removeSpec() {
    let product = this.state.product;
    let target = event.target;
    let index = target.getAttribute('data-index');
    index = parseInt(index);
    product.spec.splice(index, 1);
    this.setState({product: product});
  },
  render() {
    let product = this.state.product;
    let spec = product.spec;
    let self = this;

    let specItem = spec.map(function(item, index) {

      let operation = (
        <div className="col-3 col-offset-1">
          <button type="button" className='ant-btn ant-btn-primary ant-btn-lg' data-index={index} onClick={self.removeSpec}>删除</button>
        </div>
      );
      if(index == spec.length -1 ) {
        operation = (
          <div className="col-3 col-offset-1">
            <button type="button" className='ant-btn ant-btn-primary ant-btn-lg' onClick={self.addSpec}>添加</button>
          </div>
        );
      };

      return (
        <div className="ant-form-item">
          <label htmlFor="color" className="col-6" required>商品颜色：</label>
          <div className="col-5">
            <input className="ant-input" type="text" data-attr="color" data-index={index}
                   placeholder="输入商品颜色" value={item.color} onChange={self.handleChange}/>
          </div>
          <label htmlFor="num" className="col-4" required>商品数量：</label>
          <div className="col-5">
            <input className="ant-input" type="number" data-attr="num" data-index={index}
                   placeholder="输入商品数量" value={item.num} onChange={self.handleChange}/>
          </div>
          {operation}
        </div>
      );

    });

    return (
      <div>
        <button className="ant-btn ant-btn-primary" onClick={this.showModal}>添加商品</button>
        <Modal title="添加商品" visible={this.state.visible}
               confirmLoading={this.state.confirmLoading} onOk={this.handleOk} onCancel={this.handleCancel}>
          <form className="ant-form-horizontal">
            <div className="ant-form-item">
              <label htmlFor="name" className="col-6" required>商品名：</label>
              <div className="col-14">
                <input value={product.name}  className="ant-input" type="text" data-attr="name" placeholder="请输入商品名称" onChange={this.handleChange} />
              </div>
            </div>
            {specItem}
          </form>
        </Modal>
      </div>
    )
  }
});
module.exports = App;
