/*!
 * File: test/units/test.19.forEach.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("forEach() function")
	.throws("", () => new Linq([]).forEach("hello"), e => e.message === Errors.Messages.MUST_BE_FUNCTION_callback)
	.throws("", () => new Linq([]).forEach(null), e => e.message === Errors.Messages.MUST_BE_FUNCTION_callback)
	.throws("", () => new Linq([]).forEach(7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_callback)
	.throws("", () => new Linq([]).forEach(undefined), e => e.message === Errors.Messages.MUST_BE_FUNCTION_callback)
	.throws("", () => new Linq([]).forEach(), e => e.message === Errors.Messages.MUST_BE_FUNCTION_callback)
	.areEqual("", "", (tempString = "", new Linq([]).forEach((a, i) => tempString += (i.toString() + "->" + a.toString())), tempString))
	.areEqual("", "0-a;1-b;2-c;3-d;4-e;", (tempString = "", new Linq(["a", "b", "c", "d", "e"]).forEach((a, i) => tempString += (i.toString() + "-" + a.toString() + ";")), tempString))
	.areEqual("", "0-a;1-b;2-c;", (tempString = "", new Linq(["a", "b", "c", "d", "e"]).forEach(function (a, i) { tempString += (i.toString() + "-" + a.toString() + ";"); return a !== "c"; }), tempString))
	.areEqual("", "0-a;1-b;", (tempString = "", new Linq(["a", "b", "c", "d", "e"]).forEach(function (a, i) { if (a === "c") return false; tempString += (i.toString() + "-" + a.toString() + ";") }), tempString))
	.areEqual("", "", (tempString = "", new Linq(["a", "b", "c", "d", "e"]).forEach(function (a, i) { if (a === "a") return false; tempString += (i.toString() + "-" + a.toString() + ";") }), tempString))
	.areEqual("", "", (tempString = "", new Linq([]).forEach((a, i) => tempString += (i.toString() + "-" + a.toString() + ";")), tempString));
	