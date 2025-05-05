/*!
 * File: test/units/test.23.join.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { occupations, peopleList2 } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("join() function")
	.throws("", () =>
		new Linq(peopleList2).join(null, p => p.occupation_id, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_ITERABLE_rightIterable)

	.throws("", () =>
		new Linq(peopleList2).join(occupations, 12, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_leftKeySelector)

	.throws("", () =>
		new Linq(peopleList2).join(occupations, p => p.occupation_id, 13, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_rightKeySelector)

	.throws("", () =>
		new Linq(peopleList2).join(occupations, p => p.occupation_id, o => o.id, 14),
		e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector)

	.throws("", () =>
		new Linq(peopleList2).join(occupations, p => p.occupation_id, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}, 12), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer)

	.sequencesAreEqual("", [
		[{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation_id: 1 }, { id: 1, name: "Actor" }],
		[{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation_id: 15 }, { id: 15, name: "Comedian" }],
		[{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation_id: 4 }, { id: 4, name: "Composer" }],
		[{ Id: 149, first_name: "Mark", last_name: "Brown", occupation_id: 5 }, { id: 5, name: "Accountant" }],
		[{ Id: 66, first_name: "Eve", last_name: "White", occupation_id: 22 }, { id: 22, name: "Engineer" }],
		[{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation_id: 2 }, { id: 2, name: "Business Broker" }],
		[{ Id: 85, first_name: "Dana", last_name: "Lee", occupation_id: 6 }, { id: 6, name: "Nurse" }],
		[{ Id: 266, first_name: "James", last_name: "Wilson", occupation_id: 9 }, { id: 9, name: "Programmer" }],
		[{ Id: 408, first_name: "Levy", last_name: "Williams", occupation_id: 11 }, { id: 11, name: "Teacher" }],
		[{ Id: 11, first_name: "Ezra", last_name: "Davis", occupation_id: 2 }, { id: 2, name: "Business Broker" }],
		[{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation_id: 3 }, { id: 3, name: "Musician" }],
		[{ Id: 608, first_name: "Henry", last_name: "Moore", occupation_id: 18 }, { id: 18, name: "Hairdresser" }],
		[{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation_id: 7 }, { id: 7, name: "Journalist" }],
		[{ Id: 55, first_name: "Mason", last_name: "Martin", occupation_id: 7 }, { id: 7, name: "Journalist" }],
		[{ Id: 284, first_name: "Tom", last_name: "Smith", occupation_id: 5 }, { id: 5, name: "Accountant" }],
		[{ Id: 502, first_name: "Dana", last_name: "Jones", occupation_id: 13 }, { id: 13, name: "Farmer" }],
		[{ Id: 205, first_name: "Eve", last_name: "Johnson", occupation_id: 1 }, { id: 1, name: "Actor" }],
		[{ Id: 181, first_name: "Mason", last_name: "Clark", occupation_id: 11 }, { id: 11, name: "Teacher" }],
		[{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation_id: 12 }, { id: 12, name: "Physicist" }],
		[{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation_id: 16 }, { id: 16, name: "Pilot" }],
		[{ Id: 77, first_name: "Ethan", last_name: "Harris", occupation_id: 11 }, { id: 11, name: "Teacher" }],
		[{ Id: 306, first_name: "Jack", last_name: "Garcia", occupation_id: 3 }, { id: 3, name: "Musician" }]
	],
		new Linq(peopleList2)
			.join(occupations, p => p.occupation_id, o => o.id),
		//(a, b) => a.Id === b[0].Id && a.first_name === b[0].first_name && a.last_name === b[0].last_name && a.occupation === b[1].name)
		(a, b) => a[0].Id === b[0].Id
			&&
			a[0].first_name === b[0].first_name
			&&
			a[0].last_name === b[0].last_name
			&&
			a[0].occupation_id === b[0].occupation_id
			&&
			a[1].id === b[1].id
			&&
			a[1].name === b[1].name)

	.sequencesAreEqual("", [
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
	],
		new Linq(peopleList2)
			.join(occupations, p => p.occupation_id, o => o.id, function (p, o) {
				return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
			}),
		(a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation === b.occupation);
	