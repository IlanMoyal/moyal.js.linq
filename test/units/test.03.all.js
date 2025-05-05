/*!
 * File: test/units/test.03.all.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { emptyArray, emptyInt16Array, emptyMap, emptySet, linq2EmptyArray, linq2EmptyInt16Array, linq2EmptyMap, linq2EmptySet, linq2NumbersArray, linq2NumbersInt16Array, linq2NumbersMap, linq2NumbersSet, numbersArray, numbersInt16Array, numbersMap, numbersSet } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("all() function")
	.throws("predicate = null", () => new Linq(numbersArray).all(null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)
	.throws("predicate = 7", () => new Linq(numbersArray).all(7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_predicate)

	.isTrue("numbersArray", new Linq(numbersArray).all(val => val >= -11))
	.isFalse("numbersArray", new Linq(numbersArray).all(val => val > -11))
	.isTrue("emptyArray", new Linq(emptyArray).all(val => val != 0))

	.isTrue("numbersMap", new Linq(numbersMap).all(([key, val], index) => val >= -11))
	.isFalse("numbersMap", new Linq(numbersMap).all(([key, val], index) => val < 10))
	.isTrue("emptyMap", new Linq(emptyMap).all(([key, val], index) => val < 10))

	.isTrue("numbersSet", new Linq(numbersSet).all((val, index) => val.length >= 3))
	.isFalse("numbersSet", new Linq(numbersSet).all((val, index) => val.length < 9))
	.isTrue("emptySet", new Linq(emptySet).all((val, index) => val.length < 0))

	.isTrue("numbersInt16Array", new Linq(numbersInt16Array).all((val, index) => val >= -22))
	.isFalse("numbersInt16Array", new Linq(numbersInt16Array).all((val, index) => val < 80))
	.isTrue("emptyInt16Array", new Linq(emptyInt16Array).all((val, index) => val < 10))

	/* use predefined LINQ variable multiple times. */
	.isTrue("Linq variable of numbersArray - first run", linq2NumbersArray.all(val => val >= -11))
	.isTrue("Linq variable of numbersArray - second run", linq2NumbersArray.all(val => val >= -11))
	.isFalse("Linq variable of numbersArray - third run", linq2NumbersArray.all(val => val > -11))
	.isFalse("Linq variable of numbersArray - forth run", linq2NumbersArray.all(val => val > -11))
	.isTrue("Linq variable of emptyArray - first run", linq2EmptyArray.all(val => val != 0))
	.isTrue("Linq variable of emptyArray - second run", linq2EmptyArray.all(val => val != 0))

	.isTrue("Linq variable of numbersMap - first run", linq2NumbersMap.all(([key, val], index) => val >= -11))
	.isTrue("Linq variable of numbersMap - second run", linq2NumbersMap.all(([key, val], index) => val >= -11))
	.isFalse("Linq variable of numbersMap - third run", linq2NumbersMap.all(([key, val], index) => val < 10))
	.isFalse("Linq variable of numbersMap - forth run", linq2NumbersMap.all(([key, val], index) => val < 10))
	.isTrue("Linq variable of emptyMap - first run", linq2EmptyMap.all(([key, val], index) => val < 10))
	.isTrue("Linq variable of emptyMap - second run", linq2EmptyMap.all(([key, val], index) => val < 10))

	.isTrue("Linq variable of numbersSet - first run", linq2NumbersSet.all((val, index) => val.length >= 3))
	.isTrue("Linq variable of numbersSet - second run", linq2NumbersSet.all((val, index) => val.length >= 3))
	.isFalse("Linq variable of numbersSet - third run", linq2NumbersSet.all((val, index) => val.length < 9))
	.isFalse("Linq variable of numbersSet - forth run", linq2NumbersSet.all((val, index) => val.length < 9))
	.isTrue("Linq variable of emptySet - first run", linq2EmptySet.all((val, index) => val.length < 0))
	.isTrue("Linq variable of emptySet - second run", linq2EmptySet.all((val, index) => val.length < 0))

	.isTrue("Linq variable of numbersInt16Array - first run", linq2NumbersInt16Array.all((val, index) => val >= -22))
	.isTrue("Linq variable of numbersInt16Array - second run", linq2NumbersInt16Array.all((val, index) => val >= -22))
	.isFalse("Linq variable of numbersInt16Array - third run", linq2NumbersInt16Array.all((val, index) => val < 80))
	.isFalse("Linq variable of numbersInt16Array - forth run", linq2NumbersInt16Array.all((val, index) => val < 80))
	.isTrue("Linq variable of emptyInt16Array - first run", linq2EmptyInt16Array.all((val, index) => val < 10))
	.isTrue("Linq variable of emptyInt16Array - second run", linq2EmptyInt16Array.all((val, index) => val < 10));
	