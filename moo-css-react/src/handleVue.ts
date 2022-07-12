/**
 * @utils handleVue
 */

export function getVueComponent (renderStr: string, propsArr?: string[]): string {

    return `
import * as Vue from 'vue'
import Component from 'vue-class-component'
import './index.css'

@Component({
    props: {${propsArr && propsArr.length && propsArr.join(',') || ''}}
})
export default class MyComponent extends Vue {
    render () {
        ${propsArr && propsArr.length ? `let {${propsArr.join('')}} = this;` : ''}
        return (${renderStr.replace(/body/g, 'section').replace(/class=/g, 'className=')})
    }
}
    `
}