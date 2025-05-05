/*!
 * File: test/units/test.01.linq.init.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

//Test.throws("Initialize Linq object with number", () => new Linq(2), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable, true);

export default new TestGroup("Linq object initialization")
	.throws("Initialize Linq object with number", () => new Linq(2), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with big number", () => new Linq(123n /* big integer */), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with boolean false", () => new Linq(false), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with boolean true", () => new Linq(true), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with symbol", () => new Linq(Symbol("hello")), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with null", () => new Linq(null), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with no parameter", () => new Linq(/*undefined*/), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.throws("Initialize Linq object with object", () => new Linq({}), (e) => e.message === Errors.Messages.MUST_BE_ITERABLE_iterable)
	.noThrows("Initialize Linq with []", () => new Linq([2]))
	.noThrows("Initialize Linq with string", () => new Linq(""))
	.noThrows("Initialize Linq with Map", () => new Linq(new Map()))
	.noThrows("Initialize Linq with Set", () => new Linq(new Set()))
	.noThrows("Initialize Linq with Array", () => new Linq(new Array()))
	.noThrows("Initialize Linq with generator", () => new Linq((function* () { })() /*generator iterable */))
	.noThrows("Initialize Linq with function 'arguments'", function () { return new Linq(arguments); })
	.noThrows("Initialize Linq with Int16Array", () => new Linq(new Int16Array));
	