"use strict";
/**
 * @utils handleJsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getReactComponent(renderStr, propsArr) {
    return `
import * as React from 'react'
import './index.css'

export default function Component (props) {
    ${propsArr && propsArr.length ? `let {${propsArr.join('')}} = props;` : ''}
    return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
}
    `;
}
exports.getReactComponent = getReactComponent;
