/*!
 * File: test/units/test.42.sum.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("sum() function")
	.areEqual("", undefined, new Linq([]).sum())
	.areEqual("", undefined, new Linq([null]).sum())
	.areEqual("", undefined, new Linq([null, undefined, 5, 6]).sum())
	.areEqual("", undefined, new Linq([undefined, 5, 6]).sum())
	.areEqual("", undefined, new Linq([null, 5, 6]).sum())
	.areEqual("", 5, new Linq([5]).sum())
	.areEqual("", 11, new Linq([5, 6]).sum())
	.areEqual("", 14, new Linq([5, 6, 3]).sum())
	.areEqual("", undefined, new Linq(["a", 6]).sum())
	.areEqual("", undefined, new Linq(["a", "b"]).sum())
	.areEqual("", undefined, new Linq(["ilan", " ", "amoyal"]).sum())
	.areEqual("", undefined, new Linq(["ilan", " ", "amoyal"]).sum());
	