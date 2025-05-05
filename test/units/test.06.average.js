/*!
 * File: test/units/test.06.average.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { emptyArray, linq2EmptyArray, linq2NumbersSet, numbersArray, numbersMap, numbersSet } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("average() function")
	.areEqual("numbersSet", numbersArray.reduce((a, b) => a + b, 0) / numbersArray.length, new Linq(numbersSet).select(v => numbersMap.get(v)).average())
	.areEqual("emptyArray", undefined, new Linq(emptyArray).average())
	.areEqual("numbersSet", numbersArray.reduce((a, b) => a + b, 0) / numbersArray.length, linq2NumbersSet.select(v => numbersMap.get(v)).average())
	.areEqual("numbersSet", numbersArray.reduce((a, b) => a + b, 0) / numbersArray.length, linq2NumbersSet.select(v => numbersMap.get(v)).average())
	.areEqual("emptyArray", undefined, linq2EmptyArray.average())
	.areEqual("emptyArray", undefined, linq2EmptyArray.average());
	