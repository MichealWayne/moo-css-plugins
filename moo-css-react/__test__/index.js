const fs = require('fs');
const path = require('path');
const testdata = require('./test2.json');
const test = require('../dist/');

let datas = test.default({
  data: testdata,
  vueBool: true
});
console.log(datas);
fs.writeFileSync(path.join(__dirname, './index.jsx'), datas.jsx)
fs.writeFileSync(path.join(__dirname, './index.css'), datas.css);