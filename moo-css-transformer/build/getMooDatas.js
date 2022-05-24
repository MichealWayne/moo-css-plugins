/* eslint-disable no-console */
/**
 * moo get moo-css.json (delete useless data)-> data.json
 * @author MichealWayne
 */

const fs = require('fs');
const { join } = require('path');
const http = require('http');
const utils = require('../src/utils');

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

const NUMBER_MAP = {
  NO_ZERO: 0,
  NO_TWO: 2,
  NO_LAST: -1,
};

function handleStyleList(styleList) {
  const M2Cdata = {};
  const C2Mdata = {};

  utils.each(styleList, function (moduleitem) {
    const name = moduleitem.name || '';
    const moduleName = name.split('-')[NUMBER_MAP.NO_ZERO].slice(NUMBER_MAP.NO_LAST);
    if (!M2Cdata[moduleName]) {
      M2Cdata[moduleName] = {};
    }
    const _module = M2Cdata[moduleName];

    const childrenList = moduleitem.children;
    utils.each(childrenList, function (item) {
      const css = item['属性'];

      if (!css.includes('、')) {
        const minName = utils.getStyleMinName(css);

        if (!_module[minName]) _module[minName] = css;
        else {
          _module[utils.getStyleMinName(css, true)] = css;
        }

        C2Mdata[css] = `${moduleName}-${minName}`;
      } else {
        css.split('、').map(_css => {
          const minName = utils.getStyleMinName(_css);

          if (!_module[minName]) {
            _module[minName] = _css;
          } else {
            _module[utils.getStyleMinName(_css, true)] = _css;
          }

          C2Mdata[_css] = `${moduleName}-${minName}`;
          return true;
        });
      }
    });
  });

  fs.writeFile(
    join(__dirname, '../datas/m2c-data.json'),
    JSON.stringify(M2Cdata, null, NUMBER_MAP.NO_TWO),
    err => {
      if (err) {
        console.error(err);
      } else {
        console.log('m2c-data.json build success!');
      }
    }
  );
  fs.writeFile(
    join(__dirname, '../datas/c2m-data.json'),
    JSON.stringify(C2Mdata, null, NUMBER_MAP.NO_TWO),
    err => {
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
    if (!utils.hasOwnProp(data, i)) continue;
    if (data[i].name === '样式模块词典') {
      handleStyleList(data[i].children);
    }
  }
}

getMooList().then(resultData => handleList(resultData));
