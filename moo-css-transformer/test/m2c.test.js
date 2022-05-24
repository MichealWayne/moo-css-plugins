const { m2c } = require('../dist/m2c');

/**
 * m2c test
 */
describe('m2c keys test', () => {
  it('size attribute analyse test', () => {
    expect(m2c('g-m10').attr).toBe('margin');
    expect(m2c('g-mt10').attr).toBe('margin-top');
    expect(m2c('g-ml10').attr).toBe('margin-left');
    expect(m2c('g-mr10').attr).toBe('margin-right');
    expect(m2c('g-mb10').attr).toBe('margin-bottom');
    expect(m2c('g-t10').attr).toBe('top');
    expect(m2c('g-l10').attr).toBe('left');
    expect(m2c('g-r10').attr).toBe('right');
    expect(m2c('g-b10').attr).toBe('bottom');
    expect(m2c('g-lh10').attr).toBe('line-height');
    expect(m2c('u-h100').attr).toBe('height');
    expect(m2c('u-mh100').attr).toBe('max-height');
    expect(m2c('u-mth100').attr).toBe('min-height');
    expect(m2c('u-w100').attr).toBe('width');
    expect(m2c('u-mw100').attr).toBe('max-width');
    expect(m2c('u-mhw100').attr).toBe('min-width');
    expect(m2c('u-p10').attr).toBe('padding');
    expect(m2c('u-pl10').attr).toBe('padding-left');
    expect(m2c('u-pr10').attr).toBe('padding-right');
    expect(m2c('u-pb10').attr).toBe('padding-bottom');
    expect(m2c('u-pt10').attr).toBe('padding-top');

    expect(m2c('u-bdbw100').attr).toBe('border-bottom-width');
    expect(m2c('u-bdiw100').attr).toBe('border-image-width');
    expect(m2c('u-bdlw100').attr).toBe('border-left-width');
    expect(m2c('u-bdrw100').attr).toBe('border-right-width');
    expect(m2c('u-bdtw100').attr).toBe('border-top-width');
    expect(m2c('u-bdtw100').attr).toBe('border-top-width');
    expect(m2c('u-bdw100').attr).toBe('border-width');
    expect(m2c('u-ow100').attr).toBe('outline-width');
  });

  it('color attribute analyse test', () => {
    expect(m2c('s-cr_f00').attr).toBe('color');
    expect(m2c('s-oc_f00').attr).toBe('outline-color');
    expect(m2c('s-bdtc_f00').attr).toBe('border-top-color');
    expect(m2c('s-bdrc_f00').attr).toBe('border-right-color');
    expect(m2c('s-bdlc_f00').attr).toBe('border-left-color');
    expect(m2c('s-bdbc_f00').attr).toBe('border-bottom-color');
    expect(m2c('s-bgc_f00').attr).toBe('background-color');
  });

  it('transform attribute analyse test', () => {
    expect(m2c('f-trans_r90').attr).toBe('transform');
  });

  it('simple attribute analyse test', () => {
    expect(m2c('g-box_border-box').attr).toBe('box-sizing');
    expect(m2c('g-pr').attr).toBe('position');
    expect(m2c('g-pf').attr).toBe('position');
    expect(m2c('g-pa').attr).toBe('position');
    expect(m2c('g-fs24').attr).toBe('font-size');
    expect(m2c('f-bgc_border-box').attr).toBe('background-clip');
    expect(m2c('f-bgo_center').attr).toBe('background-origin');
    expect(m2c('f-bgr_no-repeat').attr).toBe('background-repeat');
    expect(m2c('f-bdb10').attr).toBe('border-bottom');
    expect(m2c('f-bdl10').attr).toBe('border-left');
    expect(m2c('f-bdt10').attr).toBe('border-top');
    expect(m2c('f-bdtr10').attr).toBe('border-right');
    expect(m2c('f-bdtlr10').attr).toBe('border-top-left-radius');
    expect(m2c('f-bdtrr10').attr).toBe('border-top-right-radius');
    expect(m2c('f-bdblr10').attr).toBe('border-bottom-left-radius');
    expect(m2c('f-bdbrr10').attr).toBe('border-bottom-right-radius');
    expect(m2c('f-c_both').attr).toBe('clear');
    expect(m2c('f-fr').attr).toBe('float');
    expect(m2c('f-fl').attr).toBe('float');
    expect(m2c('f-ov_hidden').attr).toBe('overflow');
    expect(m2c('f-ovx_hidden').attr).toBe('overflow-x');
    expect(m2c('f-ovy_hidden').attr).toBe('overflow-y');
    expect(m2c('f-ff_DIN').attr).toBe('font-family');
    expect(m2c('f-fs_italic').attr).toBe('font-style');
    expect(m2c('f-fw_bold').attr).toBe('font-weight');
    expect(m2c('f-tc').attr).toBe('text-align');
    expect(m2c('f-td_underline').attr).toBe('text-decoration');
    expect(m2c('f-ti2').attr).toBe('text-indent');
    expect(m2c('f-tj_center').attr).toBe('text-justify');
    expect(m2c('f-cr_pointer').attr).toBe('cursor');
    expect(m2c('u-ai_center').attr).toBe('align-items');
    expect(m2c('u-jc_center').attr).toBe('justify-content');
    expect(m2c('u-d_block').attr).toBe('display');
    expect(m2c('u-flexd_row').attr).toBe('flex-direction');
    expect(m2c('z-v_hidden').attr).toBe('visibility');
    expect(m2c('z-zi_999').attr).toBe('z-index');
    expect(m2c('z-hide_99').attr).toBe('opacity');
  });
  it('simple value analyse test', () => {
    expect(m2c('g-box_border-box').val).toBe('border-box');
    expect(m2c('g-pr').val).toBe('relative');
    expect(m2c('g-pf').val).toBe('fixed');
    expect(m2c('g-pa').val).toBe('absolute');
    expect(m2c('g-fs20').val).toBe('2.66666vw');
    expect(m2c('g-lh200per').val).toBe('200%');
    expect(m2c('f-bgc_border-box').val).toBe('border-box');
    expect(m2c('f-bgo_center').val).toBe('center');
    expect(m2c('f-bgr_no-repeat').val).toBe('no-repeat');
    expect(m2c('f-bdb10').val).toBe('1.33333vw');
    expect(m2c('f-bdl10').val).toBe('1.33333vw');
    expect(m2c('f-bdt10').val).toBe('1.33333vw');
    expect(m2c('f-bdtr10').val).toBe('1.33333vw');
    expect(m2c('f-bdtlr10').val).toBe('1.33333vw');
    expect(m2c('f-bdtrr10').val).toBe('1.33333vw');
    expect(m2c('f-bdblr10').val).toBe('1.33333vw');
    expect(m2c('f-bdbrr10').val).toBe('1.33333vw');
    expect(m2c('f-c_both').val).toBe('both');
    expect(m2c('f-fr').val).toBe('right');
    expect(m2c('f-fl').val).toBe('left');
    expect(m2c('f-ov_hidden').val).toBe('hidden');
    expect(m2c('f-ovx_hidden').val).toBe('hidden');
    expect(m2c('f-ovy_hidden').val).toBe('hidden');
    expect(m2c('f-ff_DIN').val).toBe('DIN');
    expect(m2c('f-fs_italic').val).toBe('italic');
    expect(m2c('f-fw_bold').val).toBe('bold');
    expect(m2c('f-tc').val).toBe('center');
    expect(m2c('f-td_underline').val).toBe('underline');
    expect(m2c('f-ti2').val).toBe('2');
    expect(m2c('f-tj_center').val).toBe('center');
    expect(m2c('f-cr_pointer').val).toBe('pointer');
    expect(m2c('u-ai_center').val).toBe('center');
    expect(m2c('u-jc_center').val).toBe('center');
    expect(m2c('u-d_block').val).toBe('block');
    expect(m2c('u-flexd_row').val).toBe('row');
    expect(m2c('z-v_hidden').val).toBe('hidden');
    expect(m2c('z-zi_999').val).toBe('999');
    expect(m2c('z-hide_99').val).toBe('99');
  });
});
