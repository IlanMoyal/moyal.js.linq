/*!
 * File: test/units/test.51.where.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("where() function")
	.throws("", () => new Linq([1, null, 2, undefined, 3, undefined]).where(), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.throws("", () => new Linq([1, null, 2, undefined, 3, undefined]).where(null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.throws("", () => new Linq([1, null, 2, undefined, 3, undefined]).where(undefined), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.throws("", () => new Linq([1, null, 2, undefined, 3, undefined]).where({}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.throws("", () => new Linq([1, null, 2, undefined, 3, undefined]).where(11), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.sequencesAreEqual("", [1, 2, 3], new Linq([1, null, 2, undefined, 3, undefined]).where(i => i != null))
	.sequencesAreEqual("", [2, 6, 8], new Linq([1, 2, 3, 5, 6, 7, 8, 9]).where(i => i % 2 === 0))
	.sequencesAreEqual("", [5, 6, 7, 8, 9], new Linq([1, 2, 3, 5, 6, 7, 8, 9]).where((i, index) => (i + index) % 2 === 0))
	.sequencesAreEqual("", [2], new Linq([1, 2, 3]).where(i => i % 2 === 0))
	.sequencesAreEqual("", [], new Linq([1]).where(i => i % 2 === 0))
	.sequencesAreEqual("", [], new Linq([]).where(i => i % 2 === 0));	