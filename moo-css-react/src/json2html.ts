/**
 * @module json2html
 * @author Wayne
 * @Date 2020-02-28 20:36:16
 * @LastEditTime 2022-07-10 13:19:12
 */

export default class JSON2HTML {
  static get selfCloseTags() {
    return [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
      'command',
      'keygen',
      'menuitem',
    ];
  }

  static build(json: any, handlers?: any) {
    if (!json || !json.tagName) return '';
    const props = JSON2HTMLBuilder.props(json, handlers);
    if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
      return `<${json.tagName}${props}/>`;
    }
    const children = JSON2HTMLBuilder.children(json, handlers);
    return `
<${json.tagName}${props}>${children}</${json.tagName}>`;
  }
}

export class JSON2HTMLBuilder {
  static props(json: any, handlers: any) {
    let props = json.props;
    if (!props) return '';
    let html = '';
    const { handleStyle, handleImg } = handlers;

    if (props.style && handleStyle) {
      handleStyle(props);
    }
    if (props.src && handleImg && props.src.startsWith('data:image')) {
      handleImg(props);
    }

    const keys = Object.keys(props);
    // 属性处理
    for (const index in keys) {
      let key = keys[index];
      if (key === 'children' || key === 'text') continue;
      else if (key === 'className') html += ` class="${props[key]}"`;
      else if ({}.hasOwnProperty.call(keys, index)) {
        if (props[key]) html += ` ${key}="${props[key]}"`;
      }
    }
    return html;
  }

  // 处理子元素
  static children(json: any, handlers?: any) {
    let children = json.props && json.props.children;

    if (!children) {
      let text = json.props.text;
      if (text && text.startsWith('{') && text.endsWith('}') && handlers && handlers.propsList) {
        handlers.propsList.push(text);
      }
      delete json.props.text;
      return text || '';
    }
    let html = '';
    for (const index in children) {
      if ({}.hasOwnProperty.call(children, index)) {
        if (typeof children[index] == 'object') {
          html += JSON2HTML.build(children[index], handlers);
        } else {
          html += children[index];
        }
      }
    }
    return html;
  }

  static isSelfCloseTag(json: any) {
    return JSON2HTML.selfCloseTags.indexOf(json.tag) > -1;
  }
}
