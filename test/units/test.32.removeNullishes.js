/*!
 * File: test/units/test.32.removeNullishes.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("removeNullishes() function")
	.sequencesAreEqual("", [1, 2, 3], new Linq([1, null, 2, undefined, 3, undefined]).removeNullishes())
	.sequencesAreEqual("", [1, 2, 3], new Linq([1, 2, 3]).removeNullishes())
	.sequencesAreEqual("", [], new Linq([]).removeNullishes())
	.sequencesAreEqual("", [], new Linq([null, null, undefined, null, undefined]).removeNullishes())
	.sequencesAreEqual("", [], new Linq([undefined]).removeNullishes())
	.sequencesAreEqual("", [], new Linq([null]).removeNullishes());
	