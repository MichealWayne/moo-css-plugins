/**
 * @utils handleVue
 * @author Wayne
 * @Date 2020-07-30 13:58:02
 * @LastEditTime 2023-04-25 10:36:05
 */

export function getVueComponent(renderStr: string, propsArr?: string[]): string {
  return `
import * as Vue from 'vue'
import Component from 'vue-class-component'
import './index.css'

@Component({
    props: {${(propsArr?.length && propsArr.join(',')) || ''}}
})
export default class MyComponent extends Vue {
    render () {
        ${propsArr?.length ? `let {${propsArr.join('')}} = this;` : ''}
        return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
    }
}
    `;
}
