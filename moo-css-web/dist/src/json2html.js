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
    static build(json, handleStyle) {
        if (!json || !json.tagName)
            return '';
        const props = JSON2HTMLBuilder.props(json, handleStyle);
        if (JSON2HTMLBuilder.isSelfCloseTag(json)) {
            return `<${json.tagName}${props}/>`;
        }
        const children = JSON2HTMLBuilder.children(json);
        return `<${json.tagName}${props}>
        ${children}
        </${json.tagName}>`;
    }
}
exports.default = JSON2HTML;
class JSON2HTMLBuilder {
    static props(json, handleStyle) {
        if (!json.props)
            return '';
        let html = '';
        const keys = Object.keys(json.props);
        if (json.props.style && handleStyle) {
            handleStyle(json.props);
        }
        for (const index in keys) {
            let key = keys[index];
            if (key === 'children')
                continue;
            if ({}.hasOwnProperty.call(keys, index)) {
                html += ` ${key}="${json.props[key]}"`;
            }
        }
        return html;
    }
    static children(json) {
        let children = json.props && json.props.children;
        if (!children)
            return '';
        let html = '';
        for (const index in children) {
            if ({}.hasOwnProperty.call(children, index)) {
                if (typeof children[index] == 'object') {
                    html += JSON2HTML.build(children[index]);
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
