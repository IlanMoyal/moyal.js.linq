/*!
 * File: test/units/test.52.union.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("union() function")
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).union(null), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).union(12), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid second iterator", () => new Linq([2, 4, 6, 8, 10, 12]).union(undefined), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("invalid equality comparer", () => new Linq([2, 4, 6, 8, 10, 12]).union([4, 10], {}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.sequencesAreEqual("", [2, 4, 6, 8, 10, 12, 31, 7], new Linq([2, 4, 6, 8, 10, 12]).union([4, 10, 31, 6, 7]))
	.sequencesAreEqual("", [2, 4, 6, 8, 10, 12], new Linq([2, 4, 6, 8, 10, 12]).union([]))
	.sequencesAreEqual("", [2, 4, 6, 8, 10, 12], new Linq([]).union([2, 4, 6, 8, 10, 12]))
	.sequencesAreEqual("", [], new Linq([]).union([]))
	.sequencesAreEqual("", [123], new Linq([123]).union([123]))
	.sequencesAreEqual("", [5, 4, 3, 2, 1], new Linq([5, 4, 3, 2, 1]).union([1, 2, 4, 3, 5]))
	.sequencesAreEqual("", "abcd", new Linq("abc").union("dcb"))
	.sequencesAreEqual("", [123, 222], new Linq([123]).union([222]))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [11, 2, 8, 15, 4, 6, 10, 12], new Linq([11, 2, 8, 15, 4, 6, 8, 10, 12]).union([24, 12, 12, 4], (a, b) => a * 2 === b || a * 3 === b))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [11, 2, 8, 15, 4, 6, 10, 12], new Linq([11, 2, 8, 15, 4, 6, 8, 10, 12]).union([4, 12, 24], (a, b) => a * 2 === b || a * 3 === b))
	.sequencesAreEqual("with custom equality comparer (non-commotative comparer)", [11, 2, 8, 15, 4, 6, 10, 12, 7, 40], new Linq([11, 2, 8, 15, 4, 6, 8, 10, 12]).union([4, 7, 12, 40, 24], (a, b) => a * 2 === b || a * 3 === b));
	