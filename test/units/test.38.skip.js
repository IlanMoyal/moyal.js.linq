/*!
 * File: test/units/test.38.skip.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("skip() function")
	.throws("", () => new Linq([4, 2, 3]).skip(), e => e.message === "count must be an integer")
	.throws("", () => new Linq([4, 2, 3]).skip(1.2), e => e.message === "count must be an integer")
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).skip(-1))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).skip(0))
	.sequencesAreEqual("", [2, 3], new Linq([4, 2, 3]).skip(1))
	.sequencesAreEqual("", [3], new Linq([4, 2, 3]).skip(2))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skip(3))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skip(4))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skip(5))
	.sequencesAreEqual("", [], new Linq([]).skip(1))
	.sequencesAreEqual("", [], new Linq([]).skip(2));
	