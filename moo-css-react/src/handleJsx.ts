/**
 * @utils handleReact
 * @author Wayne
 * @Date 2020-07-28 13:07:16
 * @LastEditTime 2022-07-12 13:20:58
 */

export function getReactComponent(renderStr: string, propsArr?: string[]): string {
  return `
import * as React from 'react'
import './index.css'

export default function Component (props) {
    ${propsArr && propsArr.length ? `let {${propsArr.join('')}} = props;` : ''}
    return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
}
    `;
}
