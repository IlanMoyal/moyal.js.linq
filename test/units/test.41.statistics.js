/*!
 * File: test/units/test.41.statistics.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("statistics() function")
	.throws("", () => new Linq([2, 3, 4, undefined]).statistics(), e => e.message === "At least one of the sequence's element is not a number")
	.throws("", () => new Linq([undefined]).statistics(), e => e.message === "At least one of the sequence's element is not a number")
	.areEqual("", Linq.Statistics.empty(), new Linq([]).statistics(), (a, b) => a.equal(b))
	.areEqual("", Linq.Statistics.fromJSON({
		count: 1,
		minimum: 15,
		maximum: 15,
		summary: 15,
		average: 15,
		range: 0,
		mode: undefined,
		median: undefined,
		variance: 0,
		standardDeviation: 0
	}), new Linq([15]).statistics(), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 1,
		minimum: 15,
		maximum: 15,
		summary: 15,
		average: 15,
		range: 0,
		mode: undefined,
		median: 15,
		variance: 0,
		standardDeviation: 0
	}), new Linq([15]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 2,
		minimum: 11,
		maximum: 15,
		summary: 26,
		average: 13,
		range: 4,
		mode: undefined,
		median: undefined,
		variance: 4,
		standardDeviation: 2
	}), new Linq([15, 11]).statistics(false), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 2,
		minimum: 11,
		maximum: 15,
		summary: 26,
		average: 13,
		range: 4,
		mode: undefined,
		median: 13,
		variance: 4,
		standardDeviation: 2
	}), new Linq([15, 11]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 3,
		minimum: 11,
		maximum: 19,
		summary: 45,
		average: 15,
		range: 8,
		mode: undefined,
		median: 15,
		variance: 32 / 3,
		standardDeviation: Math.sqrt(32 / 3)
	}), new Linq([15, 19, 11]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 4,
		minimum: 11,
		maximum: 19,
		summary: 56,
		average: 14,
		range: 8,
		mode: undefined,
		median: undefined,
		variance: (1 + 25 + 9 + 9) / 4.0,
		standardDeviation: Math.sqrt((1 + 25 + 9 + 9) / 4.0)
	}), new Linq([15, 19, 11, 11]).statistics(false), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 4,
		minimum: 11,
		maximum: 19,
		summary: 56,
		average: 14,
		range: 8,
		mode: [11],
		median: 13,
		variance: (1 + 25 + 9 + 9) / 4.0,
		standardDeviation: Math.sqrt((1 + 25 + 9 + 9) / 4.0)
	}), new Linq([15, 19, 11, 11]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 4,
		minimum: 11,
		maximum: 19,
		summary: 56,
		average: 14,
		range: 8,
		mode: 11,
		median: 13,
		variance: 11,
		standardDeviation: Math.sqrt(11)
	}), new Linq([15, 19, 11, 11]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 5,
		minimum: 11,
		maximum: 19,
		summary: 75,
		average: 15,
		range: 8,
		mode: undefined,
		median: undefined,
		variance: (0 + 16 + 16 + 16 + 16) / 5,
		standardDeviation: Math.sqrt((0 + 16 + 16 + 16 + 16) / 5)
	}), new Linq([15, 19, 11, 19, 11]).statistics(false), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 5,
		minimum: 11,
		maximum: 19,
		summary: 75,
		average: 15,
		range: 8,
		mode: [11, 19],
		median: 15,
		variance: 64 / 5,
		standardDeviation: Math.sqrt(64/5)
	}), new Linq([15, 19, 11, 19, 11]).statistics(true), (a, b) => a.equal(b))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 8,
		minimum: 8,
		maximum: 19,
		summary: 99,
		average: 99 / 8,
		range: 11,
		mode: undefined,
		median: undefined,
		variance: (3 * ((8 - (99 / 8.0))**2) + 2 * ((11 - (99 / 8.0))**2) + ((15 - (99 / 8.0))**2) + 2 * ((19 - (99 / 8.0))**2)) / 8,
		standardDeviation: Math.sqrt((3 * ((8 - (99 / 8.0))**2) + 2 * ((11 - (99 / 8.0))**2) + ((15 - (99 / 8.0))**2) + 2 * ((19 - (99 / 8.0))**2)) / 8)
	}), new Linq([15, 19, 11, 8, 8, 19, 11, 8]).statistics(false), (a, b) => a.equal(b, 6))

	.areEqual("", Linq.Statistics.fromJSON({
		count: 8,
		minimum: 8,
		maximum: 19,
		summary: 96,
		average: 12,
		range: 11,
		mode: [8],
		median: 11,
		variance: 18.5,
		standardDeviation: Math.sqrt(18.5)
	}), new Linq([12, 19, 11, 8, 8, 19, 11, 8]).statistics(true), (a, b) => a.equal(b));