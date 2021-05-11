/**
 * moo-css-transformer
 * @author MichealWayne
 * @update 2020.02.20
 */

const c2m = require('./dist/c2m');

module.exports = {
  m2c: require('./dist/m2c').m2c,
  c2m: c2m.style2MooSelector,
  styleScaner: c2m.styleScaner,
};
