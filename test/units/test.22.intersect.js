/*!
 * File: test/units/test.22.intersect.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("intersect() function")
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).intersect(null), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).intersect(12), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).intersect(undefined), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid equality comparer", () => new Linq([2, 4, 6, 8, 10, 12]).intersect([4, 10], {}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.sequencesAreEqual("", [4, 6, 10], new Linq([2, 4, 6, 8, 10, 12]).intersect([4, 10, 31, 6, 7]))
	.sequencesAreEqual("", [], new Linq([2, 4, 6, 8, 10, 12]).intersect([]))
	.sequencesAreEqual("", [], new Linq([]).intersect([2, 4, 6, 8, 10, 12]))
	.sequencesAreEqual("", [], new Linq([]).intersect([]))
	.sequencesAreEqual("", [123], new Linq([123]).intersect([123]))
	.sequencesAreEqual("", [5, 4, 3, 2, 1], new Linq([5, 4, 3, 2, 1]).intersect([1, 2, 4, 3, 5]))
	.sequencesAreEqual("", "bc", new Linq("abc").intersect("dcb"))
	.sequencesAreEqual("", [], new Linq([123]).intersect([222]))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [2, 8, 4, 6, 12], new Linq([11, 2, 8, 15, 4, 6, 8, 10, 12]).intersect([24, 12, 12, 4], (a, b) => a * 2 === b || a * 3 === b))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [2, 8, 4, 6, 12], new Linq([11, 2, 8, 15, 4, 6, 8, 10, 12]).intersect([4, 12, 24], (a, b) => a * 2 === b || a * 3 === b));
	