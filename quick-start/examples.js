/*!
 * File: test/units/test.54.misc.js
 */

import { Test } from "@moyal/js-test";
import Linq from "../src/index.js";

/* some more examples */
Test.logger.group("Examples", "gray")
	.group("Example 1: where -> sum", "blue")
		.log("new Linq([4, 7, 1, 23, 12, 5, 6]).where(a => a % 2 === 0).sum()")
		.log(new Linq([4, 7, 1, 23, 12, 5, 6]).where(a => a % 2 === 0).sum(), "green")
	.groupEnd()

	.group("Example 2: intersect -> toArray", "blue")
		.log("new Linq([2, 4, 6, 8, 10, 12]).intersect([4, 10, 31, 6, 7]).toArray()")
		.group("results:", "blue")
			.log(Linq.from([2, 4, 6, 8, 10, 12]).intersect([4, 10, 31, 6, 7]).toArray(), "green")
		.groupEnd()
	.groupEnd()

	.group("Example 3: union -> select -> toArray", "blue")
		.log('new Linq("Hello world").union("THIS world").select((a, idx) => `${idx}-` + a).toArray().join("|")')
		.group("results:", "blue")
			.log(new Linq("Hello world").union("THIS world").select((a, idx) => `${idx}-` + a).toArray().join("|"), "green")
		.groupEnd()
	.groupEnd()

	.group("Example 4: orderBy -> toArray", "blue")
		.log("new Linq([4, 6, 3, 1, 9]).orderBy().toArray()")
		.group("results:", "blue")
			.log(new Linq([4, 6, 3, 1, 9]).orderBy().toArray(), "green")
		.groupEnd()
	.groupEnd()

	.group("Example 5: orderBy -> thenBy -> select -> toArray", "blue")
		.log('Linq.from([{ key: 6, value: "bbb" }, { key: 3, value: "fff" }, { key: 1, value: "eee" }, { key: 4, value: "aaa" }])')
		.log('.orderBy(a => a.key, (a, b) => (a % 2 - b % 2) /* the primary order: in this comparer each odd is greater than an even number */)')
		.log('.thenBy(a => a.key, (a, b) => a - b /* the secondary order: regular order */)')
		.log('.select(a => `${a.key}: ${a.value}`)')
		.log('.toArray()')
		.group("results:", "blue")
			.log(
				Linq.from([{ key: 6, value: "bbb" }, { key: 3, value: "fff" }, { key: 1, value: "eee" }, { key: 4, value: "aaa" }])
					.orderBy(a => a.key, (a, b) => (a % 2 - b % 2) /* the primary order: in this comparer each odd is greater than an even number */)
					.thenBy(a => a.key, (a, b) => a - b /* the secondary order: regular order */)
					.select(a => `${a.key}: ${a.value}`)
					.toArray(), "green"
			)
		.groupEnd()
	.groupEnd()
	.log()
	.log("For more examples look at test/units folder in project home page on GitHub", "blue")
.groupEnd();
