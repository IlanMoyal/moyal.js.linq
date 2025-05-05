/*!
 * File: test/units/test.25.lastOrDefault.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { dividedBy } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("lastOrDefault() function")
	.areEqual("", 15, new Linq([]).lastOrDefault(15))
	.areEqual("", undefined, new Linq([]).lastOrDefault())
	.areEqual("", 12, new Linq([2, 4, 6, 8, 10, 12]).lastOrDefault(23))
	.areEqual("", 13, new Linq([2, 3, 4, 6, 8, 10, 13]).lastOrDefault(55, a => dividedBy(a - 3, 5)))
	.areEqual("", 37, new Linq([]).lastOrDefault(37, a => dividedBy(a - 3, 5)))
	.areEqual("", 122, new Linq([2, 3, 4, 6, 9, 13]).lastOrDefault(122, a => dividedBy(a - 1, 7)))
	.areEqual("", null, new Linq([2, 3, 4, 6, 9, 13]).lastOrDefault(null, a => dividedBy(a - 1, 7)))
	.areEqual("", undefined, new Linq([2, 3, 4, 6, 9, 13]).lastOrDefault(undefined, a => dividedBy(a - 1, 7)));
	
