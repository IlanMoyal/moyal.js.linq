/*!
 * File: test/units/test.10.count.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { emptyArray, emptyInt16Array, emptyMap, emptySet, linq2EmptyArray, linq2EmptyInt16Array, linq2EmptyMap, linq2EmptySet, linq2NumbersArray, linq2NumbersInt16Array, linq2NumbersMap, linq2NumbersSet, numbersArray, numbersInt16Array, numbersMap, numbersSet } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("count() function")
	.areEqual("numbersArray", numbersArray.length, new Linq(numbersArray).count())
	.areEqual("emptyArray", emptyArray.length, new Linq(emptyArray).count())

	.areEqual("numbersMap", numbersMap.size, new Linq(numbersMap).count())
	.areEqual("emptyMap", emptyMap.size, new Linq(emptyMap).count())

	.areEqual("numbersSet", numbersSet.size, new Linq(numbersSet).count())
	.areEqual("emptySet", emptySet.size, new Linq(emptySet).count())

	.areEqual("numbersInt16Array", numbersSet.size, new Linq(numbersInt16Array).count())
	.areEqual("emptyInt16Array", emptySet.size, new Linq(emptyInt16Array).count())

	/* use predefined LINQ variable multiple times. */

	.areEqual("Linq variable of numbersArray - first run", numbersArray.length, linq2NumbersArray.count())
	.areEqual("Linq variable of numbersArray - second run", numbersArray.length, linq2NumbersArray.count())
	.areEqual("Linq variable of emptyArray - first run", emptyArray.length, linq2EmptyArray.count())
	.areEqual("Linq variable of emptyArray - second run", emptyArray.length, linq2EmptyArray.count())

	.areEqual("Linq variable of numbersMap - first run", numbersMap.size, linq2NumbersMap.count())
	.areEqual("Linq variable of numbersMap - second run", numbersMap.size, linq2NumbersMap.count())
	.areEqual("Linq variable of emptyMap - first run", emptyMap.size, linq2EmptyMap.count())
	.areEqual("Linq variable of emptyMap - second run", emptyMap.size, linq2EmptyMap.count())

	.areEqual("Linq variable of numbersSet - first run", numbersSet.size, linq2NumbersSet.count())
	.areEqual("Linq variable of numbersSet - second run", numbersSet.size, linq2NumbersSet.count())
	.areEqual("Linq variable of emptySet - first run", emptySet.size, linq2EmptySet.count())
	.areEqual("Linq variable of emptySet - second run", emptySet.size, linq2EmptySet.count())

	.areEqual("Linq variable of numbersInt16Array - first run", numbersArray.length, linq2NumbersInt16Array.count())
	.areEqual("Linq variable of numbersInt16Array - second run", numbersArray.length, linq2NumbersInt16Array.count())
	.areEqual("Linq variable of emptyInt16Array - first run", emptyArray.length, linq2EmptyInt16Array.count())
	.areEqual("Linq variable of emptyInt16Array - second run", emptyArray.length, linq2EmptyInt16Array.count());
	