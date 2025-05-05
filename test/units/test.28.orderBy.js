/*!
 * File: test/units/test.28.orderBy.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("orderBy() function")
	.throws("", () => new Linq([4, 6, 3, 1, 9]).orderBy(11, 10), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector)
	.throws("", () => new Linq([4, 6, 3, 1, 9]).orderBy(null, 10), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.noThrows("", () => new Linq([4, 6, 3, 1, 9]).orderBy(null, null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer)
	.sequencesAreEqual("", [1, 3, 4, 6, 9], new Linq([4, 6, 3, 1, 9]).orderBy())
	.sequencesAreEqual("", "  beeiltt", new Linq("let it be").orderBy())
	.sequencesAreEqual("", [4], new Linq([4]).orderBy())
	.sequencesAreEqual("", [1, 4], new Linq([1, 4]).orderBy())
	.sequencesAreEqual("", [1, 4], new Linq([4, 1]).orderBy())
	.sequencesAreEqual("", [], new Linq([]).orderBy())
	.sequencesAreEqual("",
		new Linq([
			{ key: 6, value: "bbb" },
			{ key: 1, value: "eee" },
			{ key: 4, value: "aaa" }
		]).orderBy(a => a.key), [
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" },
		{ key: 6, value: "bbb" }
	], (a, b) => a.key === b.key)
	.sequencesAreEqual("", [
		{ key: 4, value: "aaa" },
		{ key: 6, value: "bbb" },
		{ key: 1, value: "eee" },
		{ key: 3, value: "fff" }
	], new Linq([
		{ key: 6, value: "bbb" },
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" }
	]).orderBy(a => a.key, (a, b) => a % 2 === b % 2 ? (a - b) : (a % 2 - b % 2) /* in this comparer each odd is greater than an even number */),
		(a, b) => a.key === b.key && a.value === b.value)

	.areEqual("", 3,
		new Linq([
			{ key: 6, value: "bbb" },
			{ key: 1, value: "eee" },
			{ key: 4, value: "aaa" }
		]).orderBy(a => a.key)/*chain some additional operations */
			.select().orderBy(a => a.key).count())

	.sequencesAreEqual("", [
		{ key: 4, value: "aaa" },
		{ key: 6, value: "bbb" },
		{ key: 1, value: "eee" },
		{ key: 3, value: "fff" }
	], new Linq([
		{ key: 6, value: "bbb" },
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" }
	]).orderBy(a => a.key, (a, b) => a % 2 === b % 2 ? (a - b) : (a % 2 - b % 2) /* in this comparer each odd is greater than an even number */),
		(a, b) => a.key === b.key && a.value === b.value);
	