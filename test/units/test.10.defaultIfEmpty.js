/*!
 * File: test/units/test.11.defaultIfEmpty.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { linq2EmptySet, linq2NumbersMap, numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("defaultIfEmpty() function")
	.sequencesAreEqual("", numbersArray, linq2NumbersMap.select(([key, val]) => val).defaultIfEmpty())
	.sequencesAreEqual("", numbersArray.slice(1), linq2NumbersMap.skip(1).select(([key, val]) => val).defaultIfEmpty())
	.sequencesAreEqual("", new Set(["thousand"]), linq2EmptySet.defaultIfEmpty("thousand"));
	