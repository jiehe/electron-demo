

import fs from 'fs';
const url = __dirname + '/../data/data.json';

let data = fs.readFileSync(url, 'utf-8');
data = JSON.parse(data);

module.exports = {
  getColumns() {
    return data.columns;
  },
  getData() {
    return data.data;
  },
  setData(item) {
    data.data.push(item);
    this.save();
  },
  removeData(index) {
    data.data.splice(index, 1);
    this.save();
  },
  saveData(product) {
    data.data = product;
    this.save();
  },
  save() {
    let saveData = JSON.stringify(data);
    fs.writeFile(url, saveData, function(err) {
    })
  }
};

