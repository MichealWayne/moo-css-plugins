/**
 * @utils handleJsx
 */

export function getReactComponent (renderStr: string, propsArr?: string[]): string {

    return `
import * as React from 'react'
import './index.css'

export default function Component (props) {
    ${propsArr && propsArr.length ? `let {${propsArr.join('')}} = props;` : ''}
    return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
}
    `
}