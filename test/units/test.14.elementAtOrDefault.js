/*!
 * File: test/units/test.14.elementAtOrDefault.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("elementAtOrDefault() function")
	.throws("undefined index", () => new Linq(["a", "b", "c"]).elementAtOrDefault(undefined, "default item"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("null index", () => new Linq(["a", "b", "c"]).elementAtOrDefault(null, "default item"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.throws("invalid index", () => new Linq(["a", "b", "c"]).elementAtOrDefault("A", "default item"), e => e.message === Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index)
	.areEqual("index = -2", "default item", new Linq(["a", "b", "c"]).elementAtOrDefault(-2, "default item"))
	.areEqual("index = -1", "default item", new Linq(["a", "b", "c"]).elementAtOrDefault(-1, "default item"))
	.areEqual("index = 0", "a", new Linq(["a", "b", "c"]).elementAtOrDefault(0, "default item"))
	.areEqual("index = 1", "b", new Linq(["a", "b", "c"]).elementAtOrDefault(1, "default item"))
	.areEqual("index = 2", "c", new Linq(["a", "b", "c"]).elementAtOrDefault(2, "default item"))
	.areEqual("index = 3", "default item", new Linq(["a", "b", "c"]).elementAtOrDefault(3, "default item"))
	.areEqual("index = 4", "default item", new Linq(["a", "b", "c"]).elementAtOrDefault(4, "default item"));
	