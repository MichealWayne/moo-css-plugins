/**
 * @namespace mvdom2web
 */

import JSON2HTML from './json2html'
import {getReactComponent} from './handleJsx'
import {getVueComponent} from './handleVue'
import {c2m} from 'moo-css-transformer'

function humpToOther(value: string, symbol: string = '-') {
    return value.replace(/[A-Z]/g, (word) => {
        return `${symbol}${word.toLowerCase()}`
    });
}

function json2Arr (obj: any) {
	let arr: any = [];
	for (let i in obj) {
		arr.push(humpToOther(i) + ':' + obj[i]);
	}
	return arr;
}

export {
    getVueComponent,
    getReactComponent
}

export default function handleData (config: any) {
    let {
        data,
        handleImg,
        nostyle,
        viewport,
        vueBool,
    } = config;
    let cssTextObj: any = {};
    const _style2MooSelector = (str: string) => {
        let _arr = str.split(':');
        if (!_arr[1] || _arr[1] === 'undefined') return undefined;
        return c2m.style2MooSelector(_arr[0], _arr[1]);
    };

    const _handleStyleProps = (props: any) => {
        let styleList = json2Arr(props.style);
        let classList: any = [];

        if (!nostyle) {
            let newStyle = styleList.filter((item: any) => {
                if (viewport && ~item.indexOf('px')) {  // mobile
                    let arr = item.split(':');
                    
                    item = `${arr[0]}:${(parseInt(arr[1]) / viewport * 100).toFixed(4)}vw`;
                }
                let moo = _style2MooSelector(item);
                if (moo) {
                    classList.push(moo);
                    if (!cssTextObj[moo]) cssTextObj[moo] = item;
                    return false;
                } else if (moo !== undefined) {
                    return item
                } else return false;
            }).join(';');
            props.style = newStyle;
        } else {
            let moduleClassList: any[] = [];
            styleList.forEach((item: any) => {                
                if (viewport && ~item.indexOf('px')) {  // mobile
                    let arr = item.split(':');
                    item = `${arr[0]}:${(parseInt(arr[1]) / viewport * 100).toFixed(4)}vw`;
                }
                let moo = _style2MooSelector(item);
                if (moo) {
                    classList.push(moo);
                    
                    if (!cssTextObj[moo]) cssTextObj[moo] = item;
                    return false;
                } else if (moo !== undefined) {
                    moduleClassList.push(item);
                    return item
                } else return false;
            })
            if (moduleClassList.length) {
                props.className = 'm-' + ('' + Math.random()).slice(-6);
                cssTextObj[props.className] = moduleClassList.join(';');
            }
            delete props.style;
        }
        
        if (classList.length) {
            let className = classList.join(' ');
            props.className = (props.className ? props.className + ' ' : '') + className;
            return className
        }
    };
    let propsList: any[] = [];
    let htmlTxt = JSON2HTML.build(
        data,
        {
            handleStyle: _handleStyleProps,
            handleImg,
            propsList,
        }
    );
    let cssTxt = '';
    for (let selector in cssTextObj) {
        cssTxt += `
.${selector} {
    ${cssTextObj[selector]}
}`
    }
    return {
        jsx: vueBool ? getVueComponent(htmlTxt, propsList) : getReactComponent(htmlTxt, propsList),
        css: cssTxt
    }
}

