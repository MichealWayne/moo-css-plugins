"use strict";
/**
 * @namespace mvdom2web
 */
Object.defineProperty(exports, "__esModule", { value: true });
const json2html_1 = require("./json2html");
const handleJsx_1 = require("./handleJsx");
exports.getReactComponent = handleJsx_1.getReactComponent;
const handleVue_1 = require("./handleVue");
exports.getVueComponent = handleVue_1.getVueComponent;
const moo_css_transformer_1 = require("moo-css-transformer");
function humpToOther(value, symbol = '-') {
    return value.replace(/[A-Z]/g, (word) => {
        return `${symbol}${word.toLowerCase()}`;
    });
}
function json2Arr(obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(humpToOther(i) + ':' + obj[i]);
    }
    return arr;
}
function handleData(config) {
    let { data, handleImg, nostyle, viewport, vueBool, } = config;
    let cssTextObj = {};
    const _style2MooSelector = (str) => {
        let _arr = str.split(':');
        if (!_arr[1] || _arr[1] === 'undefined')
            return undefined;
        return moo_css_transformer_1.c2m.style2MooSelector(_arr[0], _arr[1]);
    };
    const _handleStyleProps = (props) => {
        let styleList = json2Arr(props.style);
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
    let propsList = [];
    let htmlTxt = json2html_1.default.build(data, {
        handleStyle: _handleStyleProps,
        handleImg,
        propsList,
    });
    let cssTxt = '';
    for (let selector in cssTextObj) {
        cssTxt += `
.${selector} {
    ${cssTextObj[selector]}
}`;
    }
    return {
        jsx: vueBool ? handleVue_1.getVueComponent(htmlTxt, propsList) : handleJsx_1.getReactComponent(htmlTxt, propsList),
        css: cssTxt
    };
}
exports.default = handleData;
