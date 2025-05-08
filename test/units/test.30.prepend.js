/*!
 * File: test/units/test.30.prepend.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import { Linq } from "../../src/index.js";
import { Errors } from "../../src/Errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("prepend() function")
	.sequencesAreEqual("", [3], new Linq([]).prepend(3))
	.sequencesAreEqual("", [undefined], new Linq([]).prepend())
	.sequencesAreEqual("", ["a", "b"], new Linq(["b"]).prepend("a"))
	.sequencesAreEqual("", "ab", new Linq(["b"]).prepend("a"))
	.sequencesAreEqual("", "abc", new Linq(["b", "c"]).prepend("a"))
	.sequencesAreEqual("", ["a", "b", "c"], new Linq(["b", "c"]).prepend("a"));
	