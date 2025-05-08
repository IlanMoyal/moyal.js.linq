/*!
 * File: test/units/test.44.takeLast.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("takeLast() function")
	.throws("", () => new Linq([4, 2, 3]).takeLast(), e => e.message === "count must be an integer")
	.throws("", () => new Linq([4, 2, 3]).takeLast(1.2), e => e.message === "count must be an integer")
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).takeLast(-1))
	.sequencesAreEqual("", [], new Linq([4, 2, 3]).takeLast(0))
	.sequencesAreEqual("", [3], new Linq([4, 2, 3]).takeLast(1))
	.sequencesAreEqual("", [2, 3], new Linq([4, 2, 3]).takeLast(2))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).takeLast(3))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).takeLast(4))
	.sequencesAreEqual("", [4, 2, 3], new Linq([4, 2, 3]).takeLast(5))
	.sequencesAreEqual("", [], new Linq([]).takeLast(1))
	.sequencesAreEqual("", [], new Linq([]).takeLast(2));
