/*!
 * File: test/units/test.12.duplicate.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("duplicate() function")
	.throws("invalid factor", () => new Linq(["a", "b"]).duplicate(null), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor)
	.throws("invalid factor", () => new Linq(["a", "b"]).duplicate(1.2), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor)
	.throws("invalid factor", () => new Linq(["a", "b"]).duplicate(-0.2), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor)
	.throws("invalid factor", () => new Linq(["a", "b"]).duplicate(-1.2), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor)
	.throws("invalid factor", () => new Linq(["a", "b"]).duplicate(undefined), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor)
	.sequencesAreEqual("duplicate array 0 times", [], new Linq(["a", "b", "c"]).duplicate(0))
	.sequencesAreEqual("duplicate array 1 time", ["a", "b", "c"], new Linq(["a", "b", "c"]).duplicate(1))
	.sequencesAreEqual("duplicate array 2 time", ["a", "b", "c", "a", "b", "c"], new Linq(["a", "b", "c"]).duplicate(2))
	.sequencesAreEqual("duplicate array 3 times", ["a", "b", "c", "a", "b", "c", "a", "b", "c"], new Linq(["a", "b", "c"]).duplicate(3))
	.sequencesAreEqual("duplicate array 0 times (inplace)", [], new Linq(["a", "b", "c"]).duplicate(0, true))
	.sequencesAreEqual("duplicate array 1 time (inplace)", ["a", "b", "c"], new Linq(["a", "b", "c"]).duplicate(1, true))
	.sequencesAreEqual("duplicate array 2 time (inplace)", ["a", "a", "b", "b", "c", "c"], new Linq(["a", "b", "c"]).duplicate(2, true))
	.sequencesAreEqual("duplicate array 3 times (inplace)", ["a", "a", "a", "b", "b", "b", "c", "c", "c"], new Linq(["a", "b", "c"]).duplicate(3, true));
	