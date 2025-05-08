/*!
 * File: test/units/test.47.select.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("select() function")
	.throws("", () => new Linq([10, 8, 6, 4, 3, 1, 5]).select(15), e => e.message === "selector must be a function or nullish")
	.throws("", () => new Linq([10, 8, 6, 4, 3, 1, 5]).select("dummy"), e => e.message === "selector must be a function or nullish")
	.sequencesAreEqual("", [], new Linq([]).select())
	.sequencesAreEqual("", [11], new Linq([11]).select())
	.sequencesAreEqual("", [], new Linq([]).select(a => a + 1))
	.sequencesAreEqual("", [12], new Linq([11]).select(a => a + 1))
	.sequencesAreEqual("", [10, 8, 6, 4, 3, 1, 5], new Linq([10, 8, 6, 4, 3, 1, 5]).select())
	.sequencesAreEqual("", [10, 8, 6, 4, 3, 1, 5], new Linq([10, 8, 6, 4, 3, 1, 5]).select(a => a))
	.sequencesAreEqual("", [11, 9, 7, 5, 4, 2, 6], new Linq([10, 8, 6, 4, 3, 1, 5]).select(a => a + 1))
	.sequencesAreEqual("", [10, 9, 8, 7, 7, 6, 11], new Linq([10, 8, 6, 4, 3, 1, 5]).select((a, i) => a + i))
	.sequencesAreEqual("", [
		{ index: 0, value: 10 },
		{ index: 1, value: 9 },
		{ index: 2, value: 8 },
		{ index: 3, value: 7 },
		{ index: 4, value: 7 },
		{ index: 5, value: 6 },
		{ index: 6, value: 11 }
	], new Linq([10, 8, 6, 4, 3, 1, 5]).select((a, i) => new Object({ index: i, value: a + i })),
		(a, b) => a.index === b.index && a.value === b.value
	);
	