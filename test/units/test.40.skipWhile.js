/*!
 * File: test/units/test.40.skipWhile.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("skipWhile() function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).skipWhile(), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).skipWhile(12), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).skipWhile(null), e => e.message === "predicate must be a function")
	.throws("", () => new Linq([4, 2, 5, 7, 8, 11]).skipWhile(undefined), e => e.message === "predicate must be a function")
	.sequencesAreEqual("", [5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a <= 4))
	.sequencesAreEqual("", [2, 5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a % 4 === 0))
	.sequencesAreEqual("", [4, 2, 5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a < 0))
	.sequencesAreEqual("", [11], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a < 10))
	.sequencesAreEqual("", [4, 2, 5, 7, 8, 11], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a > 10))
	.sequencesAreEqual("", [], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a <= 11))
	.sequencesAreEqual("", [], new Linq([4, 2, 5, 7, 8, 11]).skipWhile(a => a < 100));
	