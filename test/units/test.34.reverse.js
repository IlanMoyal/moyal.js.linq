/*!
 * File: test/units/test.34.reverse.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("reverse() function")
	.sequencesAreEqual("", [undefined, 3, undefined, 2, null, 1], new Linq([1, null, 2, undefined, 3, undefined]).reverse())
	.sequencesAreEqual("", [3, 2, 1], new Linq([1, 2, 3]).reverse())
	.sequencesAreEqual("", [3, 1], new Linq([1, 3]).reverse())
	.sequencesAreEqual("", [1], new Linq([1]).reverse())
	.sequencesAreEqual("", [], new Linq([]).reverse())
	.sequencesAreEqual("", [undefined, null], new Linq([null, undefined]).reverse())
	.sequencesAreEqual("", [null, undefined], new Linq([undefined, null]).reverse())
	.sequencesAreEqual("", [undefined], new Linq([undefined]).reverse())
	.sequencesAreEqual("", [null], new Linq([null]).reverse());

