"use strict";
/**
 * @namespace mvdom2web
 */
Object.defineProperty(exports, "__esModule", { value: true });
const json2html_1 = require("./json2html");
const moo_css_transformer_1 = require("moo-css-transformer");
function handleData(config) {
    let { data, handleImg, nostyle, viewport, } = config;
    let cssTextObj = {};
    const _style2MooSelector = (str) => {
        let _arr = str.split(':');
        if (!_arr[1] || _arr[1] === 'undefined')
            return undefined;
        return moo_css_transformer_1.c2m.style2MooSelector(_arr[0], _arr[1]);
    };
    const _handleStyleProps = (props) => {
        let styleList = moo_css_transformer_1.c2m.styleScaner(`{${props.style}}`);
        let classList = [];
        if (!nostyle) {
            let newStyle = styleList.filter((item) => {
                if (viewport && ~item.indexOf('px')) { // mobile
                    let arr = item.split(':');
                    item = `${arr[0]}:${(parseInt(arr[1]) / viewport * 100).toFixed(4)}vw`;
                }
                let moo = _style2MooSelector(item);
                if (moo) {
                    classList.push(moo);
                    if (!cssTextObj[moo])
                        cssTextObj[moo] = item;
                    return false;
                }
                else if (moo !== undefined) {
                    return item;
                }
                else
                    return false;
            }).join(';');
            props.style = newStyle;
        }
        else {
            let moduleClassList = [];
            styleList.forEach((item) => {
                if (viewport && ~item.indexOf('px')) { // mobile
                    let arr = item.split(':');
                    item = `${arr[0]}:${(parseInt(arr[1]) / viewport * 100).toFixed(4)}vw`;
                }
                let moo = _style2MooSelector(item);
                if (moo) {
                    classList.push(moo);
                    if (!cssTextObj[moo])
                        cssTextObj[moo] = item;
                    return false;
                }
                else if (moo !== undefined) {
                    moduleClassList.push(item);
                    return item;
                }
                else
                    return false;
            });
            if (moduleClassList.length) {
                props.className = 'm-' + ('' + Math.random()).slice(-6);
                cssTextObj[props.className] = moduleClassList.join(';');
            }
            delete props.style;
        }
        if (classList.length) {
            let className = classList.join(' ');
            props.className = (props.className ? props.className + ' ' : '') + className;
            return className;
        }
    };
    let htmlTxt = json2html_1.default.build(data, {
        handleStyle: _handleStyleProps,
        handleImg
    });
    let cssTxt = '';
    for (let selector in cssTextObj) {
        cssTxt += `
.${selector} {
    ${cssTextObj[selector]}
}`;
    }
    return {
        html: htmlTxt,
        css: cssTxt
    };
}
exports.default = handleData;
