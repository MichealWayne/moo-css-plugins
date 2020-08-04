"use strict";
/**
 * @module json2html
 */
Object.defineProperty(exports, "__esModule", { value: true });
class JSON2HTML {
    static get selfCloseTags() {
        return [
            'area', 'base', 'br', 'col', 'embed', 'hr',
            'img', 'input', 'link', 'meta', 'param', 'source',
            'track', 'wbr', 'command', 'keygen', 'menuitem',
        ];
    }
    static build(json, handlers) {
        if (!json || !json.tagName)
            return '';
        const props = JSON2HTMLBuilder.props(json, handlers);
        if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
            return `<${json.tagName}${props}/>`;
        }
        const children = JSON2HTMLBuilder.children(json, handlers);
        return `
<${json.tagName}${props}>${children}</${json.tagName}>`;
    }
}
exports.default = JSON2HTML;
class JSON2HTMLBuilder {
    static props(json, handlers) {
        let props = json.props;
        if (!props)
            return '';
        let html = '';
        const { handleStyle, handleImg, } = handlers;
        if (props.style && handleStyle) {
            handleStyle(props);
        }
        if (props.src && handleImg && props.src.startsWith('data:image')) {
            handleImg(props);
        }
        const keys = Object.keys(props);
        for (const index in keys) {
            let key = keys[index];
            if (key === 'children' || key === 'text')
                continue;
            else if (key === 'className')
                html += ` class="${props[key]}"`;
            else if ({}.hasOwnProperty.call(keys, index)) {
                if (props[key])
                    html += ` ${key}="${props[key]}"`;
            }
        }
        return html;
    }
    static children(json, handlers) {
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
                }
                else {
                    html += children[index];
                }
            }
        }
        return html;
    }
    static isSelfCloseTag(json) {
        return (JSON2HTML.selfCloseTags.indexOf(json.tag) > -1);
    }
}
exports.JSON2HTMLBuilder = JSON2HTMLBuilder;
;
