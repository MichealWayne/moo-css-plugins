/**
 * DFS css style scaner
 */

const TAG_STATUS_MAP = {
  OUTTER: 0,
  INNER: 1,
};

/**
 * @function scanner
 * @description css string scanner
 * @param {string} cssStr
 * @returns {Array}
 */
function scaner(cssStr) {
  cssStr = String(cssStr);
  if (!cssStr || !cssStr.includes('{')) {
    return false;
  }
  cssStr = cssStr.replace(/[\r\n\t]/g, '').replace(/\:\s/g, ':');
  // 0: out of tag; 1: in css selector
  let tagStatus = TAG_STATUS_MAP.OUTTER;
  let _styleStr = '';
  const styleSet = new Set();
  for (let i = 0, len = cssStr.length; i < len; i++) {
    const _str = cssStr[i];
    if (tagStatus) {
      if (_str !== '}') {
        if (_str !== ';') {
          _styleStr += _str;
        } else {
          styleSet.add(_styleStr.trim());
          _styleStr = '';
        }
      } else {
        // close
        if (_styleStr) {
          _styleStr = _styleStr.trim();
          _styleStr && styleSet.add(_styleStr);
          _styleStr = '';
        }
        tagStatus = TAG_STATUS_MAP.OUTTER;
        continue;
      }
    } else {
      if (_str !== '{') continue;
      else {
        tagStatus = TAG_STATUS_MAP.INNER;
      }
    }
  }

  return Array.from(styleSet);
}

module.exports = scaner;
