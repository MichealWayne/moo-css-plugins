const c2m = require('../src/c2m');
const { style2MooSelector, styleScaner } = c2m;

/**
 * dom
 */
describe('c2m font test', () => {
  it('text test', () => {
    // text
    expect(style2MooSelector('font-size', '20px')).toBe('g-fs20');
    expect(style2MooSelector('font-size', '0.333rem')).toBe('g-fs24');
    expect(style2MooSelector('font-size', '2vw')).toBe('g-fs15');

    // color
    expect(style2MooSelector('color', '#fff')).toBe('s-cr_fff');
    expect(style2MooSelector('color', 'rgb(255, 30, 0)')).toBe('s-cr_ff1e00');

    // text-align
    expect(style2MooSelector('text-align', 'center')).toBe('f-tc');
    expect(style2MooSelector('text-align', 'left')).toBe('f-tl');
    expect(style2MooSelector('text-align', 'right')).toBe('f-tr');

    expect(style2MooSelector('vertical-align', 'middle')).toBe('f-vm');
    expect(style2MooSelector('vertical-align', 'top')).toBe('f-vt');
    expect(style2MooSelector('vertical-align', 'bottom')).toBe('f-vb');

    // line-height
    expect(style2MooSelector('line-height', '1.5')).toBe('g-lh150per');
    expect(style2MooSelector('line-height', '40px')).toBe('g-lh40');
    expect(style2MooSelector('line-height', '150%')).toBe('g-lh150per');

    // text-shadow
  });

  it('shape test', () => {
    expect(style2MooSelector('width', '300px')).toBe('u-w300');
    expect(style2MooSelector('width', '3rem')).toBe('u-w225');
    expect(style2MooSelector('width', '3vw')).toBe('u-w22');
    expect(style2MooSelector('height', '200px')).toBe('u-h200');
    expect(style2MooSelector('height', '1rem')).toBe('u-h75');
    expect(style2MooSelector('height', '5.5vw')).toBe('u-h41');
    expect(style2MooSelector('border-radius', '5px')).toBe('f-bdr5');
  });

  it('grid test', () => {
    expect(style2MooSelector('margin-top', '30px')).toBe('g-mt30');
    expect(style2MooSelector('margin-left', '20px')).toBe('g-ml20');
    expect(style2MooSelector('margin-bottom', '10px')).toBe('g-mb10');
    expect(style2MooSelector('margin-right', '5px')).toBe('g-mr5');
    expect(style2MooSelector('padding-top', '30px')).toBe('u-pt30');
    expect(style2MooSelector('padding-left', '20px')).toBe('u-pl20');
    expect(style2MooSelector('padding-bottom', '10px')).toBe('u-pb10');
    expect(style2MooSelector('padding-right', '5px')).toBe('u-pr5');

    expect(style2MooSelector('top', '30px')).toBe('g-t30');
    expect(style2MooSelector('left', '20px')).toBe('g-l20');
    expect(style2MooSelector('bottom', '10px')).toBe('g-b10');
    expect(style2MooSelector('right', '5px')).toBe('g-r5');

    expect(style2MooSelector('position', 'relative')).toBe('g-pr');
    expect(style2MooSelector('position', 'absolute')).toBe('g-pa');
    expect(style2MooSelector('position', 'fixed')).toBe('g-pf');
  });

  it('scanner test', () => {
    expect(
      styleScaner(`
  body{
      padding: 0 4% 50px;
      color: #333;
      font-size: 13px;
      line-height: 1.5;
  }`)[0]
    ).toBe('padding:0 4% 50px');

    expect(
      styleScaner(`
      table th, table td{border: solid 1px #d8d8d8;}
      table tbody tr td:first-child{text-align: center;}`)[0]
    ).toBe('border:solid 1px #d8d8d8');
  });
});
