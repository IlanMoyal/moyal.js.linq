/*!
 * File: test/units/test.37.singleOrDefault.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("singleOrDefault() function")
	.noThrows("", () => new Linq([]).singleOrDefault())
	.throws("", () => new Linq([1, 2]).singleOrDefault(), e => e.message === "The input sequence contains more than one element")
	.throws("", () => new Linq([1, 2]).singleOrDefault(12), e => e.message === "The input sequence contains more than one element")
	.throws("", () => new Linq([1]).singleOrDefault(null, 17), e => e.message === "predicate must be a function or nullish")
	.areEqual("", 2, new Linq([2]).singleOrDefault("default value"))
	.areEqual("", "default value", new Linq([]).singleOrDefault("default value"))
	.areEqual("", "default value", new Linq([1, 3]).singleOrDefault("default value", a => a % 2 === 0))
	.areEqual("", 6, new Linq([1, 5, 7, 6]).singleOrDefault("default value", a => a % 2 === 0))
	.throws("", () => new Linq([2, 4]).singleOrDefault("default value", a => a % 2 === 0), e => e.message === "More than one element satisfies the condition in predicate")
	.areEqual("", 3, new Linq([4, 3, 6, 2]).singleOrDefault("default value", a => a % 2 === 1))
	.areEqual("", 3, new Linq([3]).singleOrDefault("default value", a => a % 2 === 1));
	