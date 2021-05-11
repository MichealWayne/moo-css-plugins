const utils = require('./utils');
const M2Cdata = require('../datas/m2c-data.json');
const CONST = require('./const');

const BOX_LIST = ['margin', 'padding', 'width', 'height'];

function _getBasicCSS(module, minname) {
  let cssAttr = '';
  let cssVal = '';
  const tagMap = M2Cdata[module];

  if (tagMap) {
    for (const key in tagMap) {
      if (!tagMap.hasOwnProperty(key)) continue;
      const _tag = `${module}-${key}`;

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
function m2c(minname, lenUnit = 'vw', viewport = CONST.DEFAULT_SCREEN_SIZE) {
  let cssAttr = '';
  let cssVal = '';
  if (minname.includes('-')) {
    const module = minname.split('-')[CONST.NO_ZERO];

    const basicCSS = _getBasicCSS(module, minname);
    cssAttr = basicCSS.cssAttr;
    cssVal = basicCSS.cssVal;

    if (BOX_LIST.find(item => cssAttr.includes(item))) {
      // handle size
      const _val = cssVal.match(/\d+/g);
      if (lenUnit !== 'px') {
        let _valNum = String(utils.SizeUnit[`px2${lenUnit}`](_val[CONST.NO_ZERO], viewport));
        const _index = _valNum.indexOf('.');
        if (_index > -1) {
          _valNum = _valNum.slice(0, _index + 6);
        }
        cssVal = _val ? _valNum + lenUnit : '';
      } else {
        cssVal += lenUnit;
      }
    } else if (cssAttr.includes('color')) {
      // handle colors
      cssVal = `#${cssVal.slice(CONST.NO_ONE)}`;
    } else if (cssVal.startsWith('_r')) {
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
