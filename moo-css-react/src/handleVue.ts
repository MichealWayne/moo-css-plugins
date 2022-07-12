/**
 * @utils handleVue
 * @author Wayne
 * @Date 2020-07-30 13:58:02
 * @LastEditTime 2022-07-12 13:20:46
 */

export function getVueComponent(renderStr: string, propsArr?: string[]): string {
  return `
import * as Vue from 'vue'
import Component from 'vue-class-component'
import './index.css'

@Component({
    props: {${(propsArr && propsArr.length && propsArr.join(',')) || ''}}
})
export default class MyComponent extends Vue {
    render () {
        ${propsArr && propsArr.length ? `let {${propsArr.join('')}} = this;` : ''}
        return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
    }
}
    `;
}
