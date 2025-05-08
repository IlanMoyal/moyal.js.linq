/*!
 * File: test/units/test.26.max.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("max() function")
	.throws("", () => new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87]).max(11), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.throws("", () => new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87]).max({}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.throws("", () => new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87]).max("abc"), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.areEqual("", 11, new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87]).max())
	.areEqual("", 11, new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)))
	.areEqual("", 100, new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87, 100, 52, 33]).max())
	.areEqual("", 33, new Linq([1, 3, 5, -6, 4, 3, 11, 0, -87, 100, 52, 33]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)))
	.areEqual("", 5, new Linq([2, 5]).max())
	.areEqual("", 5, new Linq([2, 5]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)))
	.areEqual("", 12, new Linq([12, 5]).max())
	.areEqual("", 5, new Linq([12, 5]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)))
	.areEqual("", 12, new Linq([12]).max())
	.areEqual("", 12, new Linq([12]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)))
	.areEqual("", undefined, new Linq([]).max())
	.areEqual("", undefined, new Linq([]).max((a, b, bIndex) => a % 2 === 0 && b % 2 !== 0 ? -1 : (a % 2 !== 0 && b % 2 === 0 ? 1 : a - b)));
	