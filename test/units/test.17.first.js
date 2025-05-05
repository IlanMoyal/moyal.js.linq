/*!
 * File: test/units/test.17.first.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { dividedBy } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("first() function")
	.throws("", () => new Linq([]).first(), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY)
	.areEqual("", 2, new Linq([2, 4, 6, 8, 10, 12]).first())
	.throws("Invalid predicate", () => new Linq([2, 3, 4, 6, 8, 10, 13]).first(7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate)
	.areEqual("", 3, new Linq([2, 3, 4, 6, 8, 10, 13]).first(a => dividedBy(a - 3, 5)))
	.throws("", () => new Linq([]).first(a => dividedBy(a - 3, 5)), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY)
	.throws("", () => new Linq([2, 3, 4, 6, 9, 13]).first(a => dividedBy(a - 1, 7)), e => e.message === Errors.Messages.NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate);
	