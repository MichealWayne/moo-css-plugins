const {c2m} = require('../');
const { 
    style2MooSelector,
    styleScaner
} = c2m;

function logLine (txt) {
    console.log('************************************');
    if (txt) {
        console.log(txt);
        console.log('************************************');
    }
}

/**
 * Text test
 */
logLine('style2MooSelector test')
// text
console.log(style2MooSelector('font-size', '20px'));
console.log(style2MooSelector('font-size', '.333rem'));
console.log(style2MooSelector('font-size', '2vw'));

// color
console.log(style2MooSelector('color', '#fff'));
console.log(style2MooSelector('color', 'rgb(255, 30, 0)'));    // rgba ×

// text-align
console.log(style2MooSelector('text-align', 'center'));
console.log(style2MooSelector('text-align', 'left'));
console.log(style2MooSelector('text-align', 'right'));

console.log(style2MooSelector('vertical-align', 'middle'));
console.log(style2MooSelector('vertical-align', 'top'));
console.log(style2MooSelector('vertical-align', 'bottom'));

console.log(style2MooSelector('line-height', '1.5'))
console.log(style2MooSelector('line-height', '40px'))
console.log(style2MooSelector('line-height', '150%'))

// text-shadow?

/**
 * Shape
 */
console.log(style2MooSelector('width', '300px'));
console.log(style2MooSelector('width', '3rem'));
console.log(style2MooSelector('width', '3vw'));
console.log(style2MooSelector('height', '200px'));
console.log(style2MooSelector('height', '1rem'));
console.log(style2MooSelector('height', '5.5vw'));
console.log(style2MooSelector('border-radius', '5px'));


/**
 * Grid
 */
console.log(style2MooSelector('margin-top', '30px'));
console.log(style2MooSelector('margin-left', '20px'));
console.log(style2MooSelector('margin-bottom', '10px'));
console.log(style2MooSelector('margin-right', '5px'));
console.log(style2MooSelector('padding-top', '30px'));
console.log(style2MooSelector('padding-left', '20px'));
console.log(style2MooSelector('padding-bottom', '10px'));
console.log(style2MooSelector('padding-right', '5px'));

console.log(style2MooSelector('top', '30px'));
console.log(style2MooSelector('left', '20%'));
console.log(style2MooSelector('bottom', '10%'));
console.log(style2MooSelector('right', '5vw'));

console.log(style2MooSelector('position', 'relative'));
console.log(style2MooSelector('position', 'absolute'));
console.log(style2MooSelector('position', 'fixed'));

logLine('styleScaner test')

/**
 * scanner
 */
styleScaner(`
body{
                            padding: 0 4% 50px;
                            color: #333;
                            font-size: 13px;
                            line-height: 1.5;
                        }
h1, h2, h3 {
                            margin-top: 10px;
                            line-height: 2;
                        }
/*头部部分*/
header {
    font-family: "Microsoft Yahei", "微软雅黑", "黑体";
    font-size: 18px;
    line-height: 2.5em;
    font-weight: 400;
    text-align: center;
    border-bottom: 2px solid #DB7272;
}

h1 {
    font-weight: normal;
    font-size: 0.48rem;
}

/*内容主题*/
p {
    padding: 0.3rem;
    font-size: 0.32rem;
    text-indent: 2em;
    line-height: 0.48rem;
    margin-bottom: 0.05rem;
}
img {
    display: block;
    width: 100%;
}

/*底部区域*/
footer{
    padding: 3.75%;
    text-align: center;
    line-height: 0.533rem;
    font-size: 0.32rem;
    border-top: solid 1px #c2c2c2;
}
a{
    color: #333;
    text-decoration: none;
}
.line-under{
    text-decoration: underline;
}
.weight{
    font-weight: bold;
}
table{width: 100%;overflow-x: auto;border-spacing: 0; border-collapse: collapse;}
table p {padding:0;margin:0;text-indent:0;text-align:center;}
table th, table td{border: solid 1px #d8d8d8;}
table tbody tr td:first-child{text-align: center;}
table th{background-color: #eee; text-align: center;}

`).map(item => console.log(item + '-> ' + style2MooSelector.apply(null, item.split(':'))))