

type cssValue = string | number;

interface m2cResult {
  key: string;
  attr: string;
  val: cssValue;
}


declare module 'moo-css-transformer' {
  /**
   * MooCSS selector --> CSS values
   * @param minName
   * @param lenUnit 
   * @param viewport 
   */
  export function m2c (minName: string, lenUnit?: string, viewport?: number): m2cResult;

  /**
   * CSS values --> MooCSS selector
   * @param styleName
   * @param styleVal
   */
  export function c2m (styleName: string, styleVal: cssValue): string;

  /**
   * CSS sheet --> CSS list
   * @param cssStr
   */
  export function styleScaner (cssStr: string): string[];

  interface MooCssTransformerType {
    m2c: typeof m2c,
    c2m: typeof c2m,
    styleScaner: typeof styleScaner
  }
  const MooCssTransformer: {
    m2c: typeof m2c,
    c2m: typeof c2m,
    styleScaner: typeof styleScaner,
  }
  export default MooCssTransformer
}