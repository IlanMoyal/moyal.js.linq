/*!
 * File: test/units/test.33.repeat.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("repeat() function")
	.throws("", () => Linq.repeat(1, 5.1), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.repeat("a", -5), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.repeat("paul", null), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.repeat(12, undefined), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.throws("", () => Linq.repeat("a", "1"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count)
	.sequencesAreEqual("", [1, 1, 1, 1, 1], Linq.repeat(1, 5))
	.sequencesAreEqual("", [-1, -1, -1], Linq.repeat(-1, 3))
	.sequencesAreEqual("", ["a", "a"], Linq.repeat("a", 2))
	.sequencesAreEqual("", [null, null, null, null, null, null], Linq.repeat(null, 6))
	.sequencesAreEqual("", [undefined, undefined, undefined], Linq.repeat(undefined, 3))
	.sequencesAreEqual("", [], Linq.repeat("a", 0))
	.sequencesAreEqual("", ["a"], Linq.repeat("a", 1));
	