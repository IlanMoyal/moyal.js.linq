/*!
 * File: test/units/test.04.any.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import { emptyArray, linq2EmptyMap, linq2NumbersMap, numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("any() function")
	.throws("predicate = 7", () => new Linq(numbersArray).any(7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate)

	.isTrue("numbersArray", new Linq(numbersArray).any(val => val >= -11)) /* all */
	.isTrue("numbersArray", new Linq(numbersArray).any(val => val <= -11)) /* single */
	.isFalse("numbersArray", new Linq(numbersArray).any(val => val < -11)) /* none */
	.isFalse("emptyArray", new Linq(emptyArray).any(val => val != 0))
	.isFalse("emptyArray", new Linq(emptyArray).any(val => val >= 11))

	/* use predefined LINQ variable multiple times. */
	.isTrue("Linq variable of numbersMap - first run", linq2NumbersMap.any(([key, val], index) => val >= -11)) /* all */
	.isTrue("Linq variable of numbersMap - second run", linq2NumbersMap.any(([key, val], index) => val <= -11)) /* single */
	.isFalse("Linq variable of numbersMap - third run", linq2NumbersMap.any(([key, val], index) => val < -11)) /* none */
	.isFalse("Linq variable of numbersMap - forth run", linq2NumbersMap.any(([key, val], index) => val > 91)) /* none */
	.isFalse("Linq variable of emptyMap - first run", linq2EmptyMap.any())
	.isFalse("Linq variable of emptyMap - second run", linq2EmptyMap.any())
	.isFalse("Linq variable of emptyMap - first run", linq2EmptyMap.any(([key, val], index) => val < 10))
	.isFalse("Linq variable of emptyMap - second run", linq2EmptyMap.any(([key, val], index) => val < 10));
	