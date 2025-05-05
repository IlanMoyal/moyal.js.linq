/*!
 * File: test/units/test.46.thenBy.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { peopleList } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("thenBy()/thenByDescending functions")
	.sequencesAreEqual("with thenBy", [
		{ key: 4, value: "aaa" },
		{ key: 6, value: "bbb" },
		{ key: 1, value: "eee" },
		{ key: 3, value: "fff" }
	], new Linq([
		{ key: 6, value: "bbb" },
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" }
	]).orderBy(a => a.key, (a, b) => (a % 2 - b % 2) /* in this comparer each odd is greater than an even number */)
		.thenBy(a => a.key, (a, b) => a - b),
		(a, b) => a.key === b.key && a.value === b.value)

	.sequencesAreEqual("with thenBy", [
		{ key: 6, value: "bbb" },
		{ key: 4, value: "aaa" },
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" }
	], new Linq([
		{ key: 6, value: "bbb" },
		{ key: 3, value: "fff" },
		{ key: 1, value: "eee" },
		{ key: 4, value: "aaa" }
	]).orderBy(a => a.key, (a, b) => (a % 2 - b % 2) /* in this comparer each odd is greater than an even number */)
		.thenByDescending(a => a.key, (a, b) => a - b),
		(a, b) => a.key === b.key && a.value === b.value)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)", [
		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */),
		(a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenBy(last_name.length)", [
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenBy(last_name.length)\n.thenBy(occupation.length)", [
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */

		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */

		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length */)
		.thenBy(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenBy(last_name.length)\n.thenBy(occupation.length)\n.thenBy(Id-digit-sum)", [
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */

		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */

		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */

		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */

		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */

		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */

		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */

		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */

		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length */)
		.thenBy(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length */)
		.thenBy(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)", [
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)


	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)", [
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */

		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */

		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)\n.thenByDescending(Id-digit-sum)", [
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */

		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */

		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */

		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */

		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */

		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */

		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */

		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */

		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenByDescending(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)\n.thenByDescending(Id-digit-sum)\n.orderByDescending(first_name.length)", [
		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenByDescending(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)
		.orderByDescending(a => a.first_name, (a, b) => a.length - b.length /* a new primary order - by first name length - descending */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)

	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)\n.thenByDescending(Id-digit-sum)\n.orderByDescending(first_name.length)\n.thenBy(last_name.length)", [
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenByDescending(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)
		.orderByDescending(a => a.first_name, (a, b) => a.length - b.length /* a new primary order - by first name length - descending */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)


	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)\n.thenByDescending(Id-digit-sum)\n.orderByDescending(first_name.length)\n.thenBy(last_name.length)\n.thenBy(occupation.length)", [
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */

		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */

		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenByDescending(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)
		.orderByDescending(a => a.first_name, (a, b) => a.length - b.length /* a new primary order - by first name length - descending */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenBy(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation)
	///
	.sequencesAreEqual("peopleList\n.orderBy(first_name.length)\n.thenByDescending(last_name.length)\n.thenByDescending(occupation.length)\n.thenByDescending(Id-digit-sum)\n.orderByDescending(first_name.length)\n.thenBy(last_name.length)\n.thenBy(occupation.length)\n.thenBy(Id-digit-sum)", [
		{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */

		{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */

		{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */

		{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */

		{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */

		{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
		{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 8 */

		{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */

		{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */

		{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */

		{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */

		{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */

		{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */

		{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
		{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */

		{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */

		{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */

		{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */

		{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
	], new Linq(peopleList)
		.orderBy(a => a.first_name, (a, b) => a.length - b.length /* order by first name length */)
		.thenByDescending(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenByDescending(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenByDescending(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)
		.orderByDescending(a => a.first_name, (a, b) => a.length - b.length /* a new primary order - by first name length - descending */)
		.thenBy(a => a.last_name, (a, b) => a.length - b.length /* sub-order by last name length - descending */)
		.thenBy(a => a.occupation, (a, b) => a.length - b.length /* sub-order by occupation length - descending */)
		.thenBy(a => new Linq(a.Id.toString()).select(ch => parseInt(ch)).sum(), (a, b) => a - b /* sub-order by digit-sum of the Id */)

		, (a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation);
	