/*
 * File: test/units/globals.js
 */

import { Linq } from "../../src/index.js";

let numbersArray = [2, 3, 6, 8, 1, 20, 5, -11, 0, 91];
let emptyArray = [];
let linq2NumbersArray = new Linq(numbersArray);
let linq2EmptyArray = new Linq(emptyArray);

let numbersMap = new Map([["two", 2], ["three", 3], ["six", 6], ["eight", 8], ["one", 1], ["twenty", 20], ["five", 5], ["minus eleven", -11], ["zero", 0], ["ninty one", 91]]);
let emptyMap = new Map();
let linq2NumbersMap = new Linq(numbersMap);
let linq2EmptyMap = new Linq(emptyMap);

let numbersSet = new Set(["two", "three", "six", "eight", "one", "twenty", "five", "minus eleven", "zero", "ninty one"]);
let emptySet = new Set();
let linq2NumbersSet = new Linq(numbersSet);
let linq2EmptySet = new Linq(emptySet);

let numbersInt16Array = new Int16Array([2, 3, 6, 8, 1, 20, 5, -11, 0, 91]);
let emptyInt16Array = new Int16Array();
let linq2NumbersInt16Array = new Linq(numbersInt16Array);
let linq2EmptyInt16Array = new Linq(emptyInt16Array);

function isInteger(n) {
	return Math.floor(n) === n;
}

function dividedBy(a, b) {
	return isInteger(a / b);
}

let peopleList = [
	{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
	{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
	{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
	{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
	{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
	{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
	{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */
	{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
	{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
	{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
	{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
	{ Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
	{ Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
	{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
	{ Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
	{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
	{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
	{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
	{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
];

let peopleList2 = [
	{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation_id: 1 }, /* first_name.length = 5, last_name.length = 8, occupation.length = 5, id_sum_digits = 9 */
	{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation_id: 15 }, /* first_name.length = 3, last_name.length = 6, occupation.length = 8, id_sum_digits = 15 */
	{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation_id: 4 }, /* first_name.length = 5, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
	{ Id: 149, first_name: "Mark", last_name: "Brown", occupation_id: 5 }, /* first_name.length = 4, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 66, first_name: "Eve", last_name: "White", occupation_id: 22 }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 12 */
	{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation_id: 2 }, /* first_name.length = 5, last_name.length = 5, occupation.length = 15, id_sum_digits = 6 */
	{ Id: 85, first_name: "Dana", last_name: "Lee", occupation_id: 6 }, /* first_name.length = 4, last_name.length = 3, occupation.length = 5, id_sum_digits = 13 */
	{ Id: 266, first_name: "James", last_name: "Wilson", occupation_id: 9}, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 408, first_name: "Levy", last_name: "Williams", occupation_id: 11 }, /* first_name.length = 4, last_name.length = 8, occupation.length = 7, id_sum_digits = 12 */
	{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation_id: 2 }, /* first_name.length = 4, last_name.length = 5, occupation.length = 15, id_sum_digits = 2 */
	{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation_id: 3 }, /* first_name.length = 3, last_name.length = 5, occupation.length = 8, id_sum_digits = 10 */
	{ Id: 608, first_name: "Henry", last_name: "Moore", occupation_id: 18 }, /* first_name.length = 5, last_name.length = 5, occupation.length = 11, id_sum_digits = 14 */
	{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation_id: 7 }, /* first_name.length = 4, last_name.length = 6, occupation.length = 10, id_sum_digits = 16 */
	{ Id: 55, first_name: "Mason", last_name: "Martin", occupation_id: 7 }, /* first_name.length = 5, last_name.length = 6, occupation.length = 10, id_sum_digits = 10 */
	{ Id: 284, first_name: "Tom", last_name: "Smith", occupation_id: 5 }, /* first_name.length = 3, last_name.length = 5, occupation.length = 10, id_sum_digits = 14 */
	{ Id: 502, first_name: "Dana", last_name: "Jones", occupation_id: 13 }, /* first_name.length = 4, last_name.length = 5, occupation.length = 6, id_sum_digits = 7 */
	{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation_id: 1 }, /* first_name.length = 3, last_name.length = 7, occupation.length = 5, id_sum_digits = 7 */
	{ Id: 181, first_name: "Mason", last_name: "Clark", occupation_id: 11 }, /* first_name.length = 5, last_name.length = 5, occupation.length = 7, id_sum_digits = 10 */
	{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation_id: 12 }, /* first_name.length = 3, last_name.length = 8, occupation.length = 9, id_sum_digits = 10 */
	{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation_id: 16 }, /* first_name.length = 5, last_name.length = 6, occupation.length = 5, id_sum_digits = 11 */
	{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation_id: 11 }, /* first_name.length = 5, last_name.length = 6, occupation.length = 7, id_sum_digits = 14 */
	{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation_id: 3 }, /* first_name.length = 4, last_name.length = 6, occupation.length = 8, id_sum_digits = 9 */
];

let occupations = [
	{ id: 1, name: "Actor" },
	{ id: 2, name: "Business Broker" },
	{ id: 3, name: "Musician" },
	{ id: 4, name: "Composer" },
	{ id: 5, name: "Accountant" },
	{ id: 6, name: "Nurse" },
	{ id: 7, name: "Journalist" },
	{ id: 8, name: "Bitch" },
	{ id: 9, name: "Programmer" },
	{ id: 10, name: "Sucker" },
	{ id: 11, name: "Teacher" },
	{ id: 12, name: "Physicist" },
	{ id: 13, name: "Farmer" },
	//skip 14 for test
	{ id: 15, name: "Comedian" },
	{ id: 16, name: "Pilot" },
	{ id: 18, name: "Hairdresser" },
	{ id: 22, name: "Engineer" }
];

export {
	numbersArray,
	emptyArray,
	linq2NumbersArray,
	linq2EmptyArray,

	numbersMap,
	emptyMap,
	linq2NumbersMap,
	linq2EmptyMap,

	numbersSet,
	emptySet,
	linq2NumbersSet,
	linq2EmptySet,

	numbersInt16Array,
	emptyInt16Array,
	linq2NumbersInt16Array,
	linq2EmptyInt16Array,

	isInteger,
	dividedBy,

	peopleList,
	peopleList2,
	occupations
};