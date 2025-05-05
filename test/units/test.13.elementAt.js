/*!
 * File: test/units/test.13.elementAt.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("elementAt() function")
	.throws("negative invalid index", () => new Linq(["a", "b", "c"]).elementAt(/*none*/), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("negative invalid index", () => new Linq(["a", "b", "c"]).elementAt(undefined), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("negative invalid index", () => new Linq(["a", "b", "c"]).elementAt(null), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("negative invalid index", () => new Linq(["a", "b", "c"]).elementAt("a"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("negative index", () => new Linq(["a", "b", "c"]).elementAt(-1), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.areEqual("index = 0", "a", new Linq(["a", "b", "c"]).elementAt(0))
	.areEqual("index = 1", "b", new Linq(["a", "b", "c"]).elementAt(1))
	.areEqual("index = 2", "c", new Linq(["a", "b", "c"]).elementAt(2))
	.throws("index out of range", () => new Linq(["a", "b", "c"]).elementAt(3), e => e.message === Errors.Messages.OUT_OF_RANGE_index)
	.throws("empty array - negative index", () => new Linq([]).elementAt(-1), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("empty array - sequence is empty", () => new Linq([]).elementAt(0), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY)
	.throws("empty array - index out of range", () => new Linq([]).elementAt(1), e => e.message === Errors.Messages.SEQUENCE_IS_EMPTY);
	