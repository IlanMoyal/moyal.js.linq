/*!
 * File: test/units/test.43.take.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("take() function")
	.throws("", () => new Linq([4, 2, 3]).take(), e => e.message === "count must be an integer")
	.throws("", () => new Linq([4, 2, 3]).take(1.2), e => e.message === "count must be an integer")
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).take(-1))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).take(0))
	.sequencesAreEqual("", [4], new Linq([4, 2, 3]).take(1))
	.sequencesAreEqual("", [4, 2], new Linq([4, 2, 3]).take(2))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).take(3))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).take(4))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).take(5))
	.sequencesAreEqual("", [], new Linq([]).take(1))
	.sequencesAreEqual("", [], new Linq([]).take(2));
	