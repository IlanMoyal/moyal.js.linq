/*!
 * File: test/units/test.29.orderByDescending.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("orderByDescending() function")
	.throws("", () => new Linq([4, 6, 3, 1, 9]).orderByDescending(11, 10), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector)
	.throws("", () => new Linq([4, 6, 3, 1, 9]).orderByDescending(null, 10), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.noThrows("", () => new Linq([4, 6, 3, 1, 9]).orderByDescending(null, null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.sequencesAreEqual("", [9, 6, 4, 3, 1], new Linq([4, 6, 3, 1, 9]).orderByDescending())
	.sequencesAreEqual("", "ttlieeb  ", new Linq("let it be").orderByDescending())
	.sequencesAreEqual("", [4], new Linq([4]).orderByDescending())
	.sequencesAreEqual("", [4, 1], new Linq([1, 4]).orderByDescending())
	.sequencesAreEqual("", [4, 1], new Linq([4, 1]).orderByDescending())
	.sequencesAreEqual("", [], new Linq([]).orderByDescending())
	.sequencesAreEqual("", [
		{ key: 6, value: "bbb" },
		{ key: 4, value: "aaa" },
		{ key: 1, value: "eee" }
	], new Linq([
		{ key: 6, value: "bbb" },
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" }
	]).orderByDescending(a => a.key),
		(a, b) => a.key === b.key)
	.sequencesAreEqual("", [
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" },
		{ key: 6, value: "bbb" },
		{ key: 4, value: "aaa" }
	],
		new Linq([
			{ key: 6, value: "bbb" },
			{ key: 3, value: "fff" },
			{ key: 1, value: "eee" },
			{ key: 4, value: "aaa" }
		]).orderByDescending(a => a.key, (a, b) => a % 2 === b % 2 ? (a - b) : (a % 2 - b % 2) /* in this comparer each odd is greater than an even number */),
		(a, b) => a.key === b.key && a.value === b.value);
	