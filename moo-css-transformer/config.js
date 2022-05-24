/**
 * @config
 * @author Wayne
 */

// semantiztion style name abbreviation
const NAMEID_MAP = {
  background: 'bg',
  'box-sizing': 'box',
  border: 'bd',
  overflow: 'ov',
  opacity: 'hide',
  flex: 'flex',
  transform: 'trans',
  'text-align': 't',
  'vertical-align': 'v',
  color: 'cr',
};

// semantiztion style value abbreviation
const VALUEID_MAP = {
  left: 'l',
  right: 'r',
  center: 'c',
  middle: 'm',
  top: 't',
  bottom: 'b',
  relative: 'r',
  absolute: 'a',
  fixed: 'f',
};

// box css attribute
const BOX_LIST = [
  'top',
  'right',
  'bottom',
  'left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'width',
  'height',
  'font-size',
  'line-height',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
];

// minify css attribute
const MINI_LIST = ['position', 'text-align', 'float', 'vertical-align'];

// minify css map
const MINI_LIST_MAP = {
  position: {
    f: 'fixed',
    r: 'relative',
    a: 'absolute',
    s: 'static',
    sk: 'sticky',
  },
  'text-align': {
    c: 'center',
    l: 'left',
    r: 'right',
    j: 'justify',
  },
  float: {
    c: 'center',
    l: 'left',
    r: 'right',
  },
  'vertical-align': {
    t: 'top',
    m: 'middle',
    b: 'bottom',
  },
};

module.exports = {
  NAMEID_MAP,
  VALUEID_MAP,
  BOX_LIST,
  MINI_LIST,
  MINI_LIST_MAP,
};
