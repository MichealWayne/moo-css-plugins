# moo-css-transformer

mini name style <-> css style.

## 1.css to moo-css(c2m)

### use

``` js
import {c2m} from './moo-css-transformer'	// not public
const { 
    style2MooSelector,
    styleScaner
} = c2m;

console.log(style2MooSelector('font-size', '20px'));	// 'g-fs20'
```

### style2MooSelector
- params:
	- attribute: {String} css attribute;
	- value: {String|Number} css value.(if value is a number, it defaults to px, 70 -> 70px);
- return:
	- {String|false}: if params can be moo-css selector, return selector string, else return false.
	
for example:
``` js
style2MooSelector('text-align', 'center');	// 'f-tc'
style2MooSelector('line-height', '150%');	// 'g-lh150per'
style2MooSelector('padding', '0 4% 50px');	// false
```

### styleScaner
- params: {String} css sheet
- return: {Array}
	- item: {String} css style
	
for example:
``` js
styleScaner(`
.test1 {
	color: red;
	line-height: 150%;
}
.test2 {
	width: 50px;
	height: 60px;
	line-height: 2;
	color: red;
}
`);	// ['color:red', 'line-height:150%', 'width:50px', 'height:60px', 'line-height:2']
```

## 2.moo-css to css(m2c)

todo...