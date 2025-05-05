/*!
 * File: test/units/test.15.empty.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("empty() function")
	.areEqual("", 0, Linq.empty().count())
	.sequencesAreEqual("", [], Linq.empty());
	