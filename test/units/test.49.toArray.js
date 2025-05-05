/*!
 * File: test/units/test.49.toArray.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("toArray() function")
	.isTrue("", Array.isArray(new Linq("hello world").toArray()))
	.sequencesAreEqual("", ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"], new Linq("hello world").toArray())
	.isTrue("", Array.isArray(new Linq("hello, world").where((item, index) => index >= 2 && index <= 6).toArray()))
	.sequencesAreEqual("", ["l", "l", "o", " ", "w"], new Linq("hello world").where((item, index)=> index >= 2 && index <= 6).toArray())
	.areEqual("", 5, new Linq("hello world").where((item, index) => index >= 2 && index <= 6).toArray().length)
	.isTrue("", Array.isArray(new Linq("").toArray()))
	.sequencesAreEqual("", [], new Linq("").toArray())
	.areEqual("", 0, new Linq("").toArray().length);
	
