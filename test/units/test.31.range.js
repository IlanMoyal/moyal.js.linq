/*!
 * File: test/units/test.31.range.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("range() function")
	.throws("", () => Linq.range(1.2, 5.1), e => e.message === Errors.Messages.MUST_BE_INTEGER_start)
	.throws("", () => Linq.range(null, 5.1), e => e.message === Errors.Messages.MUST_BE_INTEGER_start)
	.throws("", () => Linq.range("1", 5.1), e => e.message === Errors.Messages.MUST_BE_INTEGER_start)
	.throws("", () => Linq.range(undefined, 5.1), e => e.message === Errors.Messages.MUST_BE_INTEGER_start)
	.throws("", () => Linq.range(-2, 5.1), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.range(-2, -5), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.range(-2, null), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.range(-2, undefined), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.range(-2, "1"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.sequencesAreEqual("", [1, 2, 3, 4, 5], Linq.range(1, 5))
	.sequencesAreEqual("", [-1, 0, 1, 2, 3], Linq.range(-1, 5))
	.sequencesAreEqual("", [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7], Linq.range(-3, 11))
	.sequencesAreEqual("", [], Linq.range(-3, 0))
	.sequencesAreEqual("", [-3], Linq.range(-3, 1));
	