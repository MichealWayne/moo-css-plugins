/**
 * moo get moo-css.json (delete useless data)-> data.json
 * @author MichealWayne
 */

const fs = require('fs');
const { join } = require('path');
const http = require('http');
const utils = require('../src/utils');
// let resultData = JSON.parse(fs.readFileSync('./result.json').toString());

function getMooList() {
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          hostname: 'blog.michealwayne.cn',
          port: 80,
          path: '/fe-tools/datas/moo-css.json',
          agent: false,
        },
        res => {
          let datas = '';
          res.on('data', data => {
            datas += data;
          });

          res.on('end', () => {
            resolve(JSON.parse(datas));
          });

          res.on('error', e => {
            reject(e);
          });
        }
      )
      .on('error', e => {
        reject(e);
      });
  });
}

function handleStyleList(styleList) {
  let M2Cdata = {},
    C2Mdata = {};

  utils.each(styleList, function (moduleitem) {
    let name = moduleitem.name || '',
      moduleName = name.split('-')[0].slice(-1);

    let _module = (M2Cdata[moduleName] = {});

    let childrenList = moduleitem.children;
    utils.each(childrenList, function (item) {
      let css = item['属性'];

      if (!~css.indexOf('、')) {
        let minName = utils.getStyleMinName(css);

        if (!_module[minName]) _module[minName] = css;
        else {
          // console.log(css);
          _module[utils.getStyleMinName(css, true)] = css;
        }

        C2Mdata[css] = `${moduleName}-${minName}`;
      } else {
        css.split('、').map(css => {
          let minName = utils.getStyleMinName(css);

          if (!_module[minName]) _module[minName] = css;
          else {
            // console.log(css);
            _module[utils.getStyleMinName(css, true)] = css;
          }

          C2Mdata[css] = `${moduleName}-${minName}`;
        });
      }
    });
  });

  fs.writeFile(
    join(__dirname, '../datas/m2c-data.json'),
    JSON.stringify(M2Cdata, null, 2),
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('m2c-data.json build success!');
      }
    }
  );
  fs.writeFile(
    join(__dirname, '../datas/c2m-data.json'),
    JSON.stringify(C2Mdata, null, 2),
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('c2m-data.json build success!');
      }
    }
  );
}

function handleList(data) {
  for (const i in data) {
    if (!data.hasOwnProperty(i)) continue;
    if (data[i].name === '样式模块词典') {
      handleStyleList(data[i].children);
    }
  }
}

getMooList().then(resultData => handleList(resultData));
