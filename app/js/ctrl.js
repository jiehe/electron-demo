'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var url = __dirname + '/../data/data.json';

var data = _fs2['default'].readFileSync(url, 'utf-8');
data = JSON.parse(data);

module.exports = {
  getColumns: function getColumns() {
    return data.columns;
  },
  getData: function getData() {
    return data.data;
  },
  setData: function setData(item) {
    data.data.push(item);
    this.save();
  },
  removeData: function removeData(index) {
    data.data.splice(index, 1);
    this.save();
  },
  saveData: function saveData(product) {
    data.data = product;
    this.save();
  },
  save: function save() {
    var saveData = JSON.stringify(data);
    _fs2['default'].writeFile(url, saveData, function (err) {});
  }
};