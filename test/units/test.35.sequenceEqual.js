/*!
 * File: test/units/test.35.sequenceEqual.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("sequenceEqual() function")
	.throws("", () => new Linq("abc").sequenceEqual(), e => e.message === Errors.Messages.MUST_BE_ITERABLE_secondIterable)
	.throws("", () => new Linq("abc").sequenceEqual(["a", "b", "c"], 11), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.isTrue("", new Linq("abc").sequenceEqual(["a", "b", "c"]))
	.isFalse("", new Linq("abc").sequenceEqual(["a", "b"]))
	.isTrue("", new Linq("abc").sequenceEqual(["a", "b", "c"], (a, b) => a === b))
	.isFalse("", new Linq("ac").sequenceEqual(["a", "b", "c"], (a, b) => a === b))
	.isTrue("", new Linq([]).sequenceEqual([]))
	.isTrue("", new Linq([]).sequenceEqual([], (a, b) => a === b))
	.isTrue("", new Linq([]).sequenceEqual(new Map(), (a, b) => a === b))
	.isTrue("", new Linq([]).sequenceEqual(new Map()))
	.isTrue("", new Linq([]).sequenceEqual(new Set(), (a, b) => a === b))
	.isTrue("", new Linq([]).sequenceEqual(new Set()))
	.isTrue("", new Linq(new Map()).sequenceEqual(new Set(), (a, b) => a === b))
	.isTrue("", new Linq(new Map()).sequenceEqual(new Set()))
	.isTrue("", new Linq([
		{ "id": 33, "name": "Albert" },
		{ "id": 12, "name": "Mark" },
		{ "id": 25, "name": "Paul" }
	]).sequenceEqual(new Map([
		[33, "Albert"],
		[12, "Mark"],
		[25, "Paul"]]
	), (a, b) => a.id === b[0] && a.name === b[1]));
	