"use strict";
/**
 * @namespace mvdom2web
 */
Object.defineProperty(exports, "__esModule", { value: true });
const json2html_1 = require("./json2html");
function test(json) {
    console.log(json2html_1.default.build(json));
}
exports.default = test;
