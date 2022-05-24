/* eslint-disable no-magic-numbers */
/**
 * @module utils
 * @author Wayne
 * @time 2020.02.19
 */

const CONST = require('./const');
const { NAMEID_MAP, VALUEID_MAP } = require('../config');

/**
 * @function type
 * @description get value type
 * @param {any} val
 * @return {string}
 */
function type(val) {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '');
}

/**
 * @function hasOwnProp
 * @param {Object} obj
 * @param {string} key
 * @returns
 */
function hasOwnProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * @function each
 * @description traverse array
 * @param {array} array
 * @param {Function} fn
 */
function each(array, fn) {
  for (let i = 0, len = array.length; i < len; i++) {
    fn(array[i], i);
  }
}

/**
 * @function getStrnumInt
 * @param {string} str
 * @param {number} multiple
 */
function getStrnumInt(str, multiple = 1) {
  // eslint-disable-next-line no-bitwise
  return ~~(parseFloat(str) * multiple);
}

/**
 * grb转16进制
 * @param {string[]} rgb
 * @return {number}
 */
function rgbToHex(rgb) {
  return rgb
    .map(value => {
      const _value = Number(value);
      return `${_value < 15 ? '0' : ''}${_value.toString(16)}`;
    })
    .join('');
}

function _getNameId(name) {
  return NAMEID_MAP[name] || name.charAt(CONST.NO_ZERO);
}
/**
 * get style name abbreviation
 * @param {string} name
 * @param {boolean} extendbool
 * @return {string}
 */
function getStyleMinName(name, extendbool) {
  if (NAMEID_MAP[name]) {
    return NAMEID_MAP[name];
  } else if (name.includes('-')) {
    const nameArr = name.split('-');
    return (
      _getNameId(nameArr[CONST.NO_ZERO]) +
      (extendbool ? name.slice(CONST.NO_LAST) : '') +
      nameArr
        .slice(1)
        .map(letter => letter.charAt(CONST.NO_ZERO))
        .join('')
    );
  } else {
    return _getNameId(name) + (extendbool ? name.slice(CONST.NO_LAST) : '');
  }
}

/**
 * @Object SizeUnit
 * @description 长度单位计算集合
 */
const SizeUnit = {
  vw2px(val, viewport) {
    return getStrnumInt(val, viewport / 100);
  },
  rem2px(val, viewport) {
    return getStrnumInt(val, viewport / 10);
  },
  px2rem(val, viewport) {
    return val / (viewport / 10);
  },
  px2vw(val, viewport) {
    return val / (viewport / 100);
  },

  handleSize(styleval, viewport) {
    const _unit = styleval.slice(-3).replace(/\d/, '');
    if (_unit === 'px') {
      return styleval.replace('px', '');
    }
    if (SizeUnit[`${_unit}2px`]) {
      return SizeUnit[`${_unit}2px`](styleval, viewport);
    }
    if (styleval.includes('.')) {
      return '';
    }
    return styleval.replace('%', 'per');
  },
};

/**
 * get style value abbreviation
 * @param {string|number} styleval
 * @param {number} viewport
 * @return {string}
 * @todo box-shadow,animation,transition,transform...
 */
function getStyleValue(_styleVal = '', viewport = CONST.DEFAULT_SCREEN_SIZE) {
  const styleval = _styleVal.trim();
  if (!styleval || (styleval.includes(' ') && !styleval.startsWith('rgb('))) {
    return '';
  }

  if (VALUEID_MAP[styleval]) {
    return VALUEID_MAP[styleval];
  }

  if (styleval[CONST.NO_ZERO].match(/\d/) || styleval[CONST.NO_ZERO] === '.') {
    // number value
    return SizeUnit.handleSize(styleval, viewport);
  } else if (styleval.startsWith('#')) {
    // hex color
    return `_${styleval.replace('#', '')}`;
  } else if (styleval.startsWith('rgb(')) {
    // rgb color
    return `_${rgbToHex(styleval.replace(/[^\d|\,]/g, '').split(','))}`;
  } else if (styleval.startsWith('rotate(')) {
    // rotate
    return `_r${parseInt(styleval.replace('rotate(', ''), 10)}`;
  } else {
    return `_${getStyleMinName(styleval)}`;
  }
}

module.exports = {
  type,
  each,
  getStyleMinName,
  getStyleValue,
  getStrnumInt,
  SizeUnit,
  hasOwnProp,
};
