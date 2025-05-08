/*!
 * File: test/units/test.02.aggregate.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import { emptyArray, linq2EmptyMap, linq2NumbersMap, numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("aggregate() function")
	.throws("accumulator = null", () => new Linq(numbersArray).aggregate(-100, null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_accumulator)
	.throws("accumulator = 7", () => new Linq(numbersArray).aggregate(-100, 7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_accumulator)
	.throws("resultSelector = 7", () => new Linq(numbersArray).aggregate(-100, function f() { }, 7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector)

	.areEqual("numbersArray", 91, new Linq(numbersArray).aggregate(-100, (item, soFar, index) => item > soFar ? item : soFar)) /* implement max */
	.areEqual("emptyArray", -100, new Linq(emptyArray).aggregate(-100, (item, soFar, index) => item > soFar ? item : soFar)) /* implement max */
	.areEqual("numbersMap", "minus hundred (-100)", linq2NumbersMap.aggregate(["minus hundred", -100], ([key, val], soFar, index) => val < soFar[1] ? [key, val] : soFar, ([key, val]) => key + ` (${val})`))
	.areEqual("numbersMap", "minus eleven (-11)", linq2NumbersMap.aggregate(["hundred", 100], ([key, val], soFar, index) => val < soFar[1] ? [key, val] : soFar, ([key, val]) => key + ` (${val})`))
	.areEqual("emptyMap", "ilan special number (i)", linq2EmptyMap.aggregate(["ilan special number", "i"], ([key, val], soFar, index) => val < soFar[1] ? [key, val] : soFar, ([key, val]) => key + ` (${val})`));
	