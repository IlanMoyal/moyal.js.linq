/*!
 * File: test/units/test.05.append.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import { emptyArray, numbersArray } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("append() function")
	.sequencesAreEqual("numbersArray", (tempNumbersArr = numbersArray.slice(0), tempNumbersArr.push(89), tempNumbersArr), new Linq(numbersArray).append(89))
	.sequencesAreEqual("numbersArray", (tempNumbersArr = numbersArray.slice(0), tempNumbersArr.push(89), tempNumbersArr), new Linq(numbersArray).append(89))
	.sequencesAreEqual("emptyArray", ["hello"], new Linq(emptyArray).append("hello"))
	.areEqual("emptyArray", 1, new Linq(emptyArray).append("hello").count())
	.isTrue("emptyArray", new Linq(emptyArray).append("hello").single() === "hello");
	