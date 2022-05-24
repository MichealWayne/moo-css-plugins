/**
 * @module m2c
 * @description moo to css
 * @author Wayne
 * @time 2020.02.19
 */
const utils = require('./utils');
const M2Cdata = require('../datas/m2c-data.json');
const CONST = require('./const');
const { BOX_LIST, MINI_LIST, MINI_LIST_MAP } = require('../config');

function _getBasicCSS(moduleName, minname) {
  let cssAttr = '';
  let cssVal = '';
  const tagMap = M2Cdata[moduleName];

  if (tagMap) {
    for (const key in tagMap) {
      if (!utils.hasOwnProp(tagMap, key)) continue;
      const _tag = `${moduleName}-${key}`;

      if (
        minname.includes(_tag) &&
        (minname[_tag.length] === '_' ||
          +minname[_tag.length] ||
          _tag.length >= minname.length - CONST.NO_ONE)
      ) {
        cssAttr = tagMap[key];
        cssVal = minname.replace(_tag, '');
        break;
      }
    }
  }
  return {
    cssAttr,
    cssVal,
  };
}

/**
 * @function m2c
 * @param {String} minname
 * @param {String} lenUnit
 * @param {Number} viewport
 * @returns
 */
// eslint-disable-next-line complexity
function m2c(minname, lenUnit = 'vw', viewport = CONST.DEFAULT_SCREEN_SIZE) {
  let cssAttr = '';
  let cssVal = '';
  if (minname.includes('-')) {
    const moduleName = minname.split('-')[CONST.NO_ZERO];

    const basicCSS = _getBasicCSS(moduleName, minname);
    cssAttr = basicCSS.cssAttr;
    cssVal = basicCSS.cssVal;

    if (BOX_LIST.find(item => cssAttr.includes(item))) {
      // handle size
      const _val = cssVal.match(/\d+/g);

      if (cssVal.endsWith('per')) {
        cssVal = `${parseInt(cssVal, 10)}%`;
      } else if (lenUnit !== 'px') {
        let _valNum = String(utils.SizeUnit[`px2${lenUnit}`](_val[CONST.NO_ZERO], viewport));
        const _index = _valNum.indexOf('.');
        if (_index > -1) {
          _valNum = _valNum.slice(0, _index + 6);
        }
        cssVal = _val ? _valNum + lenUnit : '';
      } else {
        cssVal += lenUnit;
      }
    } else if (MINI_LIST.includes(cssAttr)) {
      cssVal = MINI_LIST_MAP[cssAttr][cssVal] || cssVal;
    } else if (cssAttr.includes('color')) {
      // handle colors
      cssVal = `#${cssVal.slice(CONST.NO_ONE)}`;
    } else if (moduleName === 'f' && cssVal.startsWith('_r')) {
      // handle rotate
      cssVal = `rotate(${parseInt(cssVal.replace('_r', ''), 10)}deg)`;
    } else if (cssVal.startsWith('_')) {
      cssVal = cssVal.slice(CONST.NO_ONE);
    }
    //}
  }
  return {
    key: minname,
    attr: cssAttr,
    val: cssVal,
  };
}

module.exports = {
  m2c,
};
