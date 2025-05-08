/*!
 * File: test/units/test.07.concat.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import { linq2EmptyArray, linq2NumbersArray, linq2NumbersMap, numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("concat() function")
	.throws("not iterable argument - 7", () => new Linq(numbersArray).concat(7), e => e.message === Errors.Messages.ALL_MUST_BE_ITERABLE)
	.throws("not iterable argument - null", () => new Linq(numbersArray).concat(null), e => e.message === Errors.Messages.ALL_MUST_BE_ITERABLE)
	.throws("not iterable argument - undefined", () => new Linq(numbersArray).concat(undefined), e => e.message === Errors.Messages.ALL_MUST_BE_ITERABLE)

	.sequencesAreEqual("numbersArray", (tempNumbersArr = numbersArray.slice(0), tempNumbersArr.push(...(numbersArray.slice(0).reverse())), tempNumbersArr), new Linq(numbersArray).concat(linq2NumbersMap.select(([key, val]) => val).reverse()))
	.sequencesAreEqual("numbersMap", (tempNumbersArr = numbersArray.slice(0), tempNumbersArr.push(...(numbersArray.slice(0).reverse())), tempNumbersArr.push(...numbersArray), tempNumbersArr.push(...(numbersArray.slice(0).reverse())), tempNumbersArr), linq2NumbersMap.select(([key, val]) => val).concat(linq2NumbersArray.reverse(), linq2NumbersArray, linq2NumbersArray.reverse()))
	.sequencesAreEqual("numbersArray", linq2NumbersArray.duplicate(4), new Linq(numbersArray).concat(numbersArray, numbersArray, numbersArray))
	.areEqual("emptyArray", 0, linq2EmptyArray.concat([]).count());
	