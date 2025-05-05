/*!
 * File: test/units/test.36.single.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("single() function")
	.throws("", () => new Linq([]).single(), e => e.message === "The sequence is empty")
	.throws("", () => new Linq([1, 2]).single(), e => e.message === "The input sequence contains more than one element")
	.throws("", () => new Linq([1]).single(17), e => e.message === "predicate must be a function or nullish")
	.areEqual("", 2, new Linq([2]).single())
	.throws("", () => new Linq([]).single(a => a % 2 === 0), e => e.message === "The sequence is empty")
	.throws("", () => new Linq([2, 4]).single(a => a % 2 === 0), e => e.message === "More than one element satisfies the condition in predicate")
	.throws("", () => new Linq([1, 3]).single(a => a % 2 === 0), e => e.message === "No element satisfies the condition in predicate")
	.areEqual("", 3, new Linq([4, 3, 6, 2]).single(a => a % 2 === 1))
	.areEqual("", 3, new Linq([3]).single(a => a % 2 === 1));
	