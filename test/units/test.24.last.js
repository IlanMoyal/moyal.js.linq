/*!
 * File: test/units/test.24.last.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { dividedBy } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("last() function")
	.throws("", () => new Linq([]).last(), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY)
	.areEqual("", 12, new Linq([2, 4, 6, 8, 10, 12]).last())
	.areEqual("", 13, new Linq([2, 3, 4, 6, 8, 10, 13]).last(a => dividedBy(a - 3, 5)))
	.throws("", () => new Linq([]).last(a => dividedBy(a - 3, 5)), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY)
	.throws("", () => new Linq([2, 3, 4, 6, 9, 13]).last(a => dividedBy(a - 1, 7)), e => e.message === Errors.Messages.NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate);
	
