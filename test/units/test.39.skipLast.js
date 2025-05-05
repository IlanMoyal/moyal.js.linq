/*!
 * File: test/units/test.39.skipLast.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("skipLast() function")
	.throws("", () => new Linq([4, 2, 3]).skipLast(), e => e.message === "count must be an integer")
	.throws("", () => new Linq([4, 2, 3]).skipLast(1.2), e => e.message === "count must be an integer")
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).skipLast(-1))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).skipLast(0))
	.sequencesAreEqual("", [4, 2], new Linq([4, 2, 3]).skipLast(1))
	.sequencesAreEqual("", [4], new Linq([4, 2, 3]).skipLast(2))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skipLast(3))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skipLast(4))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).skipLast(5))
	.sequencesAreEqual("", [], new Linq([]).skipLast(1))
	.sequencesAreEqual("", [], new Linq([]).skipLast(2));
	