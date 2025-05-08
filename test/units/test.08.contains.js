/*!
 * File: test/units/test.08.contains.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import { numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("contains() function")
	.throws("invalid equalityComparer - 7", () => new Linq(numbersArray).contains(8, 7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.noThrows("invalid equalityComparer - null", () => new Linq(numbersArray).contains(8, null))
	.noThrows("invalid equalityComparer - undefined", () => new Linq(numbersArray).contains(2, undefined))

	/* numbersArray = [2, 3, 6, 8, 1, 20, 5, -11, 0, 91] */
	.isTrue("numbersArray", new Linq(numbersArray).contains(8))
	.isTrue("numbersArray", new Linq(numbersArray).contains(91))
	.isFalse("numbersArray", new Linq(numbersArray).contains(null))
	.isFalse("numbersArray", new Linq(numbersArray).contains())
	.isFalse("numbersArray", new Linq(numbersArray).contains(15))
	.isFalse("numbersArray", new Linq(numbersArray).contains(8, (value, item, itemIdx) => value == item - 2))
	.isTrue("numbersArray", new Linq(numbersArray).contains(6, (value, item, itemIdx) => value == item - 2))
	.isTrue("numbersArray", new Linq(numbersArray).contains(8, (value, item, itemIdx) => value == item + itemIdx))
	.isFalse("numbersArray", new Linq(numbersArray).contains(6, (value, item, itemIdx) => value == item + itemIdx));
	