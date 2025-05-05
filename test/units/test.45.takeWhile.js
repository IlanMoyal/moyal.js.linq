/*!
 * File: test/units/test.45.takeWhile.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("takeWhile() function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).takeWhile(), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).takeWhile(12), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).takeWhile(null), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).takeWhile(undefined), e => e.message === "predicate must be a function")
	.sequencesAreEqual("", [4, 2], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a <= 4))
	.sequencesAreEqual("", [4], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a % 4 === 0))
	.sequencesAreEqual("", [], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a < 0))
	.sequencesAreEqual("", [4, 2, 5, 7, 8], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a < 10))
	.sequencesAreEqual("", [], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a > 10))
	.sequencesAreEqual("", [4, 2, 5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a <= 11))
	.sequencesAreEqual("", [4, 2, 5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).takeWhile(a => a < 100));

