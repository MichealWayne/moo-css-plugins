/**
 * @namespace mvdom2web
 * @Date 2020-02-28 20:36:16
 * @LastEditTime 2023-04-25 10:39:38
 */

import JSON2HTML from './json2html';
import { getReactComponent } from './handleJsx';
import { getVueComponent } from './handleVue';
import { c2m } from 'moo-css-transformer';

function humpToOther(value: string, symbol: string = '-') {
  return value.replace(/[A-Z]/g, word => {
    return `${symbol}${word.toLowerCase()}`;
  });
}

function json2Arr(obj: any) {
  const arr: string[] = [];
  for (const i in obj) {
    arr.push(humpToOther(i) + ':' + obj[i]);
  }
  return arr;
}

export { getVueComponent, getReactComponent };

/**
 * @function handleData
 * @description 处理样式数据
 * @param config
 * @returns
 */
export default function handleData(config: any) {
  const { data, handleImg, nostyle, viewport, vueBool } = config;
  const cssTextObj: any = {};
  const _style2MooSelector = (str: string) => {
    const _arr = str.split(':');
    if (!_arr[1] || _arr[1] === 'undefined') return undefined;
    return c2m.style2MooSelector(_arr[0], _arr[1]);
  };

  const _handleStyleProps = (props: any) => {
    const styleList = json2Arr(props.style);
    const classList: any = [];

    if (!nostyle) {
      const newStyle = styleList
        .filter((item: any) => {
          if (viewport && ~item.indexOf('px')) {
            // mobile
            const arr = item.split(':');

            item = `${arr[0]}:${((parseInt(arr[1]) / viewport) * 100).toFixed(4)}vw`;
          }
          const moo = _style2MooSelector(item);
          if (moo) {
            classList.push(moo);
            if (!cssTextObj[moo]) cssTextObj[moo] = item;
            return false;
          } else if (moo !== undefined) {
            return item;
          } else return false;
        })
        .join(';');
      props.style = newStyle;
    } else {
      const moduleClassList: string[] = [];
      styleList.forEach(item => {
        if (viewport && ~item.indexOf('px')) {
          // mobile
          const arr = item.split(':');
          item = `${arr[0]}:${((parseInt(arr[1]) / viewport) * 100).toFixed(4)}vw`;
        }
        const moo = _style2MooSelector(item);
        if (moo) {
          classList.push(moo);

          if (!cssTextObj[moo]) cssTextObj[moo] = item;
          return false;
        } else if (moo !== undefined) {
          moduleClassList.push(item);
          return item;
        } else return false;
      });
      if (moduleClassList.length) {
        props.className = 'm-' + ('' + Math.random()).slice(-6);
        cssTextObj[props.className] = moduleClassList.join(';');
      }
      delete props.style;
    }

    if (classList.length) {
      const className = classList.join(' ');
      props.className = (props.className ? `${props.className} ` : '') + className;
      return className;
    }
  };
  const propsList: any[] = [];
  const htmlTxt = JSON2HTML.build(data, {
    handleStyle: _handleStyleProps,
    handleImg,
    propsList,
  });
  let cssTxt = '';
  for (const selector in cssTextObj) {
    cssTxt += `
.${selector} {
    ${cssTextObj[selector]}
}`;
  }
  return {
    jsx: vueBool ? getVueComponent(htmlTxt, propsList) : getReactComponent(htmlTxt, propsList),
    css: cssTxt,
  };
}
