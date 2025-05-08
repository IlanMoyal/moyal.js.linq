/*!
 * File: test/units/test.50.toMap.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("toMap() / toSet() functions")
	.throws("", () => new Linq(["this", "is", "a", "message"]).toMap("dummy key selector", item => item), e=>e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector)
	.throws("", () => new Linq(["this", "is", "a", "message"]).toMap(item => item.charAt(0), 15), e=>e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_valueSelector)
	.throws("", () => new Linq(["this", "is", "a", "message", "to", "you"]).toMap(item => item.charAt(0), item => item), e=>e.message === Errors.Messages.PRODUCES_DUPLICATE_KEYS_keySelector)
	.sequencesAreEqual("", [["t", "this"], ["i", "is"], ["a", "a"], ["m", "message"]], new Linq(["this", "is", "a", "message"]).toMap(item => item.charAt(0), item => item), (a, b) => a[0] === b[0] && a[1] === b[1])
	.sequencesAreEqual("", [["t", "his"], ["i", "s"], ["a", ""], ["m", "essage"]], new Linq(["this", "is", "a", "message"]).toMap(item => item.charAt(0), item => item.substr(1)), (a, b) => a[0] === b[0] && a[1] === b[1])
	.sequencesAreEqual("", [["this", "this"], ["is", "is"], ["a", "a"], ["message", "message"]], new Linq(["this", "is", "a", "message"]).toMap(), (a, b) => a[0] === b[0] && a[1] === b[1])

	.throws("", () => new Linq(["this", "is", "a", "message"]).toSet("dummy key selector"), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector)
	.throws("", () => new Linq(["this", "is", "a", "message", "to", "you"]).toSet(item => item.charAt(0)), e => e.message === Errors.Messages.PRODUCES_DUPLICATE_KEYS_keySelector)
	.sequencesAreEqual("", ["t", "i", "a", "m"], new Linq(["this", "is", "a", "message"]).toSet(item => item.charAt(0)))
	.sequencesAreEqual("", ["this", "is", "a", "message"], new Linq(["this", "is", "a", "message"]).toSet());
	