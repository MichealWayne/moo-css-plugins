/* eslint-disable no-bitwise */
/**
 * @module c2m
 * @description css to moo
 * @author Wayne
 * @time 2020.02.19
 */
const utils = require('./utils');
const scaner = require('./scaner');
const C2Mdata = require('../datas/c2m-data.json');
const CONST = require('./const');

const MooValueHandler = {
  display(styleVal) {
    return `${styleVal === 'none' ? 'z-' : 'u-'}${
      {
        'inline-block': 'block_il',
        none: 'hide',
      }[styleVal] || styleVal
    }`;
  },

  opacity(styleVal) {
    return `${~~(styleVal * CONST.ONE_HUNDRED)}`;
  },

  'font-family'(styleVal) {
    return styleVal && styleVal.split(',')[CONST.NO_ZERO];
  },

  'box-size'() {
    return 'box-sizing';
  },

  'line-height'(styleVal) {
    if (!Number.isNaN(+styleVal)) {
      return `${~~parseFloat(styleVal * CONST.ONE_HUNDRED)}%`;
    } else {
      return styleVal;
    }
  },
};

/**
 * @function style2MooSelector
 * @description style content -> moo-css selector
 * @param {string} stylename
 * @param {string} styleVal
 * @return {string | false}
 */
function style2MooSelector(stylename, _styleVal) {
  // handle display
  if (stylename === 'display') {
    return MooValueHandler.display(_styleVal);
  }
  let styleVal = _styleVal;
  // handle rgba color
  if (styleVal.startsWith('rgba') && styleVal.endsWith('1)')) {
    styleVal = styleVal.replace(/\s/g, '').replace('rgba', 'rgb').replace(',1)', ')');
  } else if (MooValueHandler[stylename]) {
    styleVal = MooValueHandler[stylename](styleVal);
  }

  const name = C2Mdata[stylename];
  const value = utils.getStyleValue(styleVal);

  return name && value ? name + value : '';
}

module.exports = {
  style2MooSelector,
  styleScaner: scaner,
};
