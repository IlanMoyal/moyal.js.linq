/*!
 * File: test/units/test.20.groupBy.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("groupBy() function")
	.throws("", () => new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(11, 12, 13, 14), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector)
	.throws("", () => new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(null, 12, 13, 14), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_elementSelector)
	.throws("", () => new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(null, null, 13, 14), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector)
	.throws("", () => new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(null, null, null, 14), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer)
	.throws("", () => new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(a => null).toArray(), e => e.message === Errors.Messages.ARGUMENT_MUST_NOT_BE_NULL_key)

	.sequencesAreEqual("", [
		{ key: 5, elements: [5, 5, 5, 5] },
		{ key: 2, elements: [2, 2] },
		{ key: 11, elements: [11, 11, 11] },
		{ key: 4, elements: [4, 4] },
		{ key: 6, elements: [6] },
		{ key: 1, elements: [1] },
		{ key: 7, elements: [7, 7] }
	], new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(),
		(a, b) => a.key === b.key && Array.from(b).every((element, index) => element === a.elements[index]))

	.sequencesAreEqual("", [
		{ key: 1, elements: [5, 11, 5, 1, 7, 5, 5, 7, 11, 11] },
		{ key: 0, elements: [2, 4, 6, 2, 4] }
	], new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(item => item % 2),
		(a, b) => a.key === b.key && Array.from(b).every((element, index) => element === a.elements[index]))

	.sequencesAreEqual("", [
		{ key: 5, count: 4 },
		{ key: 2, count: 2 },
		{ key: 11, count: 3 },
		{ key: 4, count: 2 },
		{ key: 6, count: 1 },
		{ key: 1, count: 1 },
		{ key: 7, count: 2 }
	], new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(null, null, function (a) { return { key: a.key, count: a.count() } }),
		(a, b) => a.key === b.key && a.count === b.count)

	.sequencesAreEqual("", [
		{ key: 5, count: 4, min: 5 + 0, max: 5 + 11, avg: ((5 + 0) + (5 + 4) + (5 + 10) + (5 + 11)) / 4 },
		{ key: 2, count: 2, min: 2 + 1, max: 2 + 8, avg: ((2 + 1) + (2 + 8)) / 2 },
		{ key: 11, count: 3, min: 11 + 2, max: 11 + 14, avg: ((11 + 2) + (11 + 13) + (11 + 14)) / 3 },
		{ key: 4, count: 2, min: 4 + 3, max: 4 + 9, avg: ((4 + 3) + (4 + 9)) / 2 },
		{ key: 6, count: 1, min: 6 + 5, max: 6 + 5, avg: (6 + 5) / 1 },
		{ key: 1, count: 1, min: 1 + 6, max: 1 + 6, avg: (1 + 6) / 1 },
		{ key: 7, count: 2, min: 7 + 7, max: 7 + 12, avg: ((7 + 7) + (7 + 12)) / 2 }
	], new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(null, function (item, index) { return item + index }, function (grp) { return { key: grp.key, count: grp.count(), min: grp.min(), max: grp.max(), avg: grp.average() } }),
		(a, b) => a.key === b.key && a.count === b.count && a.min === b.min && a.max === b.max && a.avg === b.avg)

	.sequencesAreEqual("", [
		{ key: "key_5", count: 4, min: 5 + 0, max: 5 + 11, avg: ((5 + 0) + (5 + 4) + (5 + 10) + (5 + 11)) / 4 },
		{ key: "key_2", count: 2, min: 2 + 1, max: 2 + 8, avg: ((2 + 1) + (2 + 8)) / 2 },
		{ key: "key_11", count: 3, min: 11 + 2, max: 11 + 14, avg: ((11 + 2) + (11 + 13) + (11 + 14)) / 3 },
		{ key: "key_4", count: 2, min: 4 + 3, max: 4 + 9, avg: ((4 + 3) + (4 + 9)) / 2 },
		{ key: "key_6", count: 1, min: 6 + 5, max: 6 + 5, avg: (6 + 5) / 1 },
		{ key: "key_1", count: 1, min: 1 + 6, max: 1 + 6, avg: (1 + 6) / 1 },
		{ key: "key_7", count: 2, min: 7 + 7, max: 7 + 12, avg: ((7 + 7) + (7 + 12)) / 2 }
	], new Linq([5, 2, 11, 4, 5, 6, 1, 7, 2, 4, 5, 5, 7, 11, 11]).groupBy(o => "key_" + o, function (item, index) { return item + index }, function (grp) { return { key: grp.key, count: grp.count(), min: grp.min(), max: grp.max(), avg: grp.average() } }),
		(a, b) => a.key === b.key && a.count === b.count && a.min === b.min && a.max === b.max && a.avg === b.avg);