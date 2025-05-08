/*!
 * File: test/units/test.16.except.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup, Throws } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("except() function")
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).except(null), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).except(12), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).except(undefined), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid equality comparer", () => new Linq([2, 4, 6, 8, 10, 12]).except([4, 10], {}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.sequencesAreEqual("", [2, 6, 8, 12], new Linq([2, 4, 6, 8, 10, 12]).except([4, 10]))
	.sequencesAreEqual("", [2, 4, 6, 8, 10, 12], new Linq([2, 4, 6, 8, 10, 12]).except([]))
	.sequencesAreEqual("", [], new Linq([]).except([2, 4, 6, 8, 10, 12]))
	.sequencesAreEqual("", [], new Linq([]).except([]))
	.sequencesAreEqual("", [123], new Linq([123]).except([]))
	.sequencesAreEqual("", [123, 222], new Linq([123, 222]).except([]))
	.sequencesAreEqual("", [123], new Linq([123]).except([222]))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [4, 6, 8, 10, 12], new Linq([2, 4, 6, 8, 10, 12]).except([4, 10], (a, b) => a * 2 === b || a * 3 === b))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [8, 10, 12], new Linq([2, 4, 6, 8, 10, 12]).except([12, 4 /* reverse the variables!*/], (a, b) => a * 2 === b || a * 3 === b));
	