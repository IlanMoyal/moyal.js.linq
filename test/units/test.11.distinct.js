/*!
 * File: test/units/test.11.distinct.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import {} from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("distinct() function")
	.throws("distinct with invalid equality comparer 1", () => new Linq([44, 1, 2, 11, 23, 44, 1, 12, 23]).distinct(7), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer)
	.sequencesAreEqual("distinct of array with duplicate items", [44, 1, 2, 11, 23, 12], new Linq([44, 1, 2, 11, 23, 44, 1, 12, 23]).distinct())
	.sequencesAreEqual("distinct objects only by key",
		[
			{ key: "a", value: 44 },
			{ key: "b", value: 1 },
			{ key: "c", value: 2 },
			{ key: "d", value: 11 },
			{ key: "e", value: 23 },
			{ key: "h", value: 12 }
		],
		new Linq([
			{ key: "a", value: 44 },
			{ key: "b", value: 1 },
			{ key: "c", value: 2 },
			{ key: "d", value: 11 },
			{ key: "e", value: 23 },
			{ key: "f", value: 44 },
			{ key: "g", value: 1 },
			{ key: "h", value: 12 },
			{ key: "i", value: 23 }
		]).distinct((a, b) => a.value === b.value),
		(a, b) => a.key === b.key && a.value === b.value)
	.sequencesAreEqual("distinct objects by both key and value",
		[
			{ key: "a", value: 44 },
			{ key: "b", value: 1 },
			{ key: "c", value: 2 },
			{ key: "d", value: 11 },
			{ key: "e", value: 23 },
			{ key: "f", value: 44 },
			{ key: "g", value: 1 },
			{ key: "h", value: 12 },
			{ key: "i", value: 23 }
		],
		new Linq([
			{ key: "a", value: 44 },
			{ key: "b", value: 1 },
			{ key: "c", value: 2 },
			{ key: "d", value: 11 },
			{ key: "e", value: 23 },
			{ key: "f", value: 44 },
			{ key: "g", value: 1 },
			{ key: "h", value: 12 },
			{ key: "i", value: 23 }]).distinct((a, b) => a.key === b.key && a.value === b.value),
		(a, b) => a.key === b.key && a.value === b.value)
	.sequencesAreEqual("distinct of unique items array", [44, 1, 2, 11, 23, 12], new Linq([44, 1, 2, 11, 23, 12]).distinct())
	.areEqual("distinct of empty array", 0, new Linq([]).count());