/*!
 * File: test/units/test.53.zip.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("zip() function")
	.throws("", () => Linq.zip(8, 4, (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`).sequenceEqual(["Item 0 is 'one', whose numeric value is 1", "Item 1 is 'two', whose numeric value is 2", "Item 2 is 'three', whose numeric value is 3"]), e => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable1)
	.throws("", () => Linq.zip([1, 2, 3], 4, (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`).sequenceEqual(["Item 0 is 'one', whose numeric value is 1", "Item 1 is 'two', whose numeric value is 2", "Item 2 is 'three', whose numeric value is 3"]), e => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable2)
	.throws("", () => Linq.zip([1, 2, 3], "abc", 7), e => e.message === "transform must be a function")
	.sequencesAreEqual("", [
		"Item 0 is 'one', whose numeric value is 1",
		"Item 1 is 'two', whose numeric value is 2",
		"Item 2 is 'three', whose numeric value is 3"
	], Linq.zip([1, 2, 3], ["one", "two", "three"], (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`))
	.sequencesAreEqual("", [
		"Item 0 is 'a', whose numeric value is 1",
		"Item 1 is 'b', whose numeric value is 2",
		"Item 2 is 'c', whose numeric value is 3"
	], Linq.zip([1, 2, 3], "abc", (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`))
	.sequencesAreEqual("", [
		"Item 0 is 'a', whose numeric value is 1",
		"Item 1 is 'b', whose numeric value is 2"
	], Linq.zip([1, 2, 3], "ab", (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`))
	.sequencesAreEqual("", [], Linq.zip([], "abc", (a, b, idx) => `Item ${idx} is '${b}', whose numeric value is ${a}`));
	