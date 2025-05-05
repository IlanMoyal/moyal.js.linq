/*!
 * File: test/units/test.18.firstOrDefault.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { dividedBy } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("firstOrDefault() function")
	.throws("Invalid predicate", () => new Linq([2, 3, 4, 6, 8, 10, 13]).firstOrDefault(16, "invalid predicate"), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate)
	.areEqual("", 15, new Linq([]).firstOrDefault(15))
	.areEqual("", undefined, new Linq([]).firstOrDefault())
	.areEqual("", 2, new Linq([2, 4, 6, 8, 10, 12]).firstOrDefault(23))
	.areEqual("", 3, new Linq([2, 3, 4, 6, 8, 10, 13]).firstOrDefault(55, a => dividedBy(a - 3, 5)))
	.areEqual("", 37, new Linq([]).firstOrDefault(37, a => dividedBy(a - 3, 5)))
	.areEqual("", 122, new Linq([2, 3, 4, 6, 9, 13]).firstOrDefault(122, a => dividedBy(a - 1, 7)))
	.areEqual("", null, new Linq([2, 3, 4, 6, 9, 13]).firstOrDefault(null, a => dividedBy(a - 1, 7)))
	.areEqual("", undefined, new Linq([2, 3, 4, 6, 9, 13]).firstOrDefault(undefined, a => dividedBy(a - 1, 7)));
	