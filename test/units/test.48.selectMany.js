/*!
 * File: test/units/test.48.selectMany.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { peopleList } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("selectMany() function")
	.throws("", () => new Linq([[1, 2], [4, 7]]).selectMany(12), e => e.message === "collectionSelector must be a function or nullish")
	.throws("", () => new Linq([[1, 2], [4, 7]]).selectMany(null, 12), e => e.message === "resultSelector must be a function or nullish")
	.sequencesAreEqual("", [1, 2, 4, 7], new Linq([
		[1, 2],
		[4, 7]
	]).selectMany())
	.sequencesAreEqual("", [
		"Logan", "Anderson",
		"Bob", "Sponge", 
		"Ethan", "Thomas", 
		"Mark", "Brown", 
		"Eve", "White", 
		"Mason", "Lewis", 
		"Dana", "Lee", 
		"James", "Wilson", 
		"Levy", "Williams", 
		"Ezra", "Davis", 
		"Bob", "Dylan", 
		"Henry", "Moore", 
		"Ryan", "Miller", 
		"Mason", "Martin", 
		"Tom", "Smith", 
		"Dana", "Jones", 
		"Eve", "Johnson", 
		"Mason", "Clark", 
		"Eve", "Thompson", 
		"Bryan", "Taylor", 
		"Ethan", "Harris", 
		"Jack", "Garcia"
	], new Linq(peopleList)
		.selectMany(p => [p.first_name, p.last_name]))

	.sequencesAreEqual("", [1, 2, 4, 7], new Linq([
		[1, 2],
		[4, 7]
	]).selectMany())
	.sequencesAreEqual("", [
		"logan", "anderson",
		"bob", "sponge",
		"ethan", "thomas",
		"mark", "brown",
		"eve", "white",
		"mason", "lewis",
		"dana", "lee",
		"james", "wilson",
		"levy", "williams",
		"ezra", "davis",
		"bob", "dylan",
		"henry", "moore",
		"ryan", "miller",
		"mason", "martin",
		"tom", "smith",
		"dana", "jones",
		"eve", "johnson",
		"mason", "clark",
		"eve", "thompson",
		"bryan", "taylor",
		"ethan", "harris",
		"jack", "garcia"
	], new Linq(peopleList)
		.selectMany(p => [p.first_name, p.last_name], item => item.toLowerCase()));
	