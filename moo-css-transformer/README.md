# moo-css-transformer



MooCSS transform tool.



## Version

0.1.0



## Installation

``` sh
npm install --save moo-css-transformer
```

or

``` sh
yarn add moo-css-transformer
```






## Use

``` js
const { m2c, c2m, styleScaner } = require('moo-css-transformer');
console.log(m2c('g-mt20'));
console.log(c2m('margin-top', '20px'));
console.log(styleScaner('.d{color:red}.c{width: 50px}'));
```

### API

- m2c: MooCSS selector --> CSS values
- c2m: CSS values --> MooCSS selector
- styleScaner: CSS sheet --> CSS list



#### c2m

- params:
  - attribute: `{String}` css attribute;
  - value: `{String|Number} `css value.(if value is a number, it defaults to px, 70 -> 70px);
- return:
  - `{String}`: if params can be moo-css selector, return selector string, else return false.

for example:

``` js
c2m('text-align', 'center');	// 'f-tc'
c2m('line-height', '150%');	// 'g-lh150per'
c2m('padding', '0 4% 50px');	// ''
```



#### m2c

- params:
  - minName: `{String}` ,MooCSS selector, such as `u-w10`
  - lenUnit: `{String}`, css length unit`"vw"/"rem"/"px"`, default: `"vw"`
  - Viewport: `{Number}`, responsive mobile screen, default: `750`
- return:`{Object}`
  - key: `{String}`, key name 
  - attr: `{String}`, css style attribute
  - val: `{String | Number}`, css style value



for example:

``` js
m2c('g-mt10');	// key: 'g-mt10', attr: 'margin-top', val: '1.33333vw'
m2c('u-w100', 'rem');	// key: 'u-w100', attr: 'width', val: '1.33333rem'
m2c('u-w100', 'px');	// key: 'u-w100', attr: 'width', val: '100px'
m2c('u-w100', 'rem', 500);	// key: 'u-w100', attr: 'width', val: '2rem'
```



#### styleScaner

- params: `{String}` css sheet
- return: `{Array}`
  - item: `{String}` css style



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





## Update

2022.05.14