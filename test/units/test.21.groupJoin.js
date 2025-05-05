/*!
 * File: test/units/test.21.groupJoin.js
 */

/* eslint-disable no-unused-vars */

import { TestGroup } from "@moyal/js-test";
import Linq from "../../src/index.js";
import Errors from "../../src/errors.js";
import { occupations, peopleList2 } from "./globals.js";

let tempNumbersArr; /* to be used within tests using comma separator */
let tempString = null;
let tempValue;

export default new TestGroup("groupJoin() function")
	.throws("", () =>
		new Linq(peopleList2).groupJoin(null, p => p.occupation_id, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_ITERABLE_rightIterable)

	.throws("", () =>
		new Linq(peopleList2).groupJoin(occupations, 12, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_leftKeySelector)

	.throws("", () =>
		new Linq(peopleList2).groupJoin(occupations, p => p.occupation_id, 13, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_rightKeySelector)

	.throws("", () =>
		new Linq(peopleList2).groupJoin(occupations, p => p.occupation_id, o => o.id, 14),
		e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector)

	.throws("", () =>
		new Linq(peopleList2).groupJoin(occupations, p => p.occupation_id, o => o.id, function (p, o) {
			return { Id: p.Id, first_name: p.first_name, last_name: p.last_name, occupation: o.name }
		}, 12), e => e.message === Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer)

	.sequencesAreEqual("", [
		[{ id: 1, name: "Actor" }, [{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation_id: 1 }, { Id: 205, first_name: "Eve", last_name: "Johnson", occupation_id: 1 } ]],
		[{ id: 2, name: "Business Broker" }, [{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation_id: 2 }, { Id: 11, first_name: "Ezra", last_name: "Davis", occupation_id: 2 }]],
		[{ id: 3, name: "Musician" }, [{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation_id: 3 }, { Id: 306, first_name: "Jack", last_name: "Garcia", occupation_id: 3 }]],
		[{ id: 4, name: "Composer" }, [{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation_id: 4 }]],
		[{ id: 5, name: "Accountant" }, [{ Id: 149, first_name: "Mark", last_name: "Brown", occupation_id: 5 }, { Id: 284, first_name: "Tom", last_name: "Smith", occupation_id: 5 }]],
		[{ id: 6, name: "Nurse" }, [{ Id: 85, first_name: "Dana", last_name: "Lee", occupation_id: 6 }]],
		[{ id: 7, name: "Journalist" }, [{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation_id: 7 }, { Id: 55, first_name: "Mason", last_name: "Martin", occupation_id: 7 }]],
		[{ id: 8, name: "Bitch" }, []],
		[{ id: 9, name: "Programmer" }, [{ Id: 266, first_name: "James", last_name: "Wilson", occupation_id: 9 }]],
		[{ id: 10, name: "Sucker" }, []],
		[{ id: 11, name: "Teacher" }, [{ Id: 408, first_name: "Levy", last_name: "Williams", occupation_id: 11 }, { Id: 181, first_name: "Mason", last_name: "Clark", occupation_id: 11 }, { Id: 77, first_name: "Ethan", last_name: "Harris", occupation_id: 11 }]],
		[{ id: 12, name: "Physicist" }, [{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation_id: 12 }]],
		[{ id: 13, name: "Farmer" }, [{ Id: 502, first_name: "Dana", last_name: "Jones", occupation_id: 13 }]],
		//skip 14 for test
		[{ id: 15, name: "Comedian" }, [{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation_id: 15 }]],
		[{ id: 16, name: "Pilot" }, [{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation_id: 16 }]],
		[{ id: 18, name: "Hairdresser" }, [{ Id: 608, first_name: "Henry", last_name: "Moore", occupation_id: 18 }]],
		[{ id: 22, name: "Engineer" }, [{ Id: 66, first_name: "Eve", last_name: "White", occupation_id: 22 }]]
	], new Linq(occupations).groupJoin(peopleList2, o => o.id, p => p.occupation_id),
		(a, b) => a[0].id === b[0].id && a[0].name === b[0].name && Linq.from(a[1]).sequenceEqual(b[1],
			(a, b) => a.Id === b.Id && a.first_name === b.first_name && a.last_name === b.last_name && a.occupation_id === b.occupation_id)
	)

	.sequencesAreEqual("", [
		[{ Id: 36, first_name: "Logan", last_name: "Anderson", occupation: "Actor" }, { Id: 205, first_name: "Eve", last_name: "Johnson", occupation: "Actor" }],
		[{ Id: 303, first_name: "Mason", last_name: "Lewis", occupation: "Business Broker" }, { Id: 11, first_name: "Ezra", last_name: "Davis", occupation: "Business Broker" }],
		[{ Id: 109, first_name: "Bob", last_name: "Dylan", occupation: "Musician" }, { Id: 306, first_name: "Jack", last_name: "Garcia", occupation: "Musician" }],
		[{ Id: 108, first_name: "Ethan", last_name: "Thomas", occupation: "Composer" }],
		[{ Id: 149, first_name: "Mark", last_name: "Brown", occupation: "Accountant" }, { Id: 284, first_name: "Tom", last_name: "Smith", occupation: "Accountant" }],
		[{ Id: 85, first_name: "Dana", last_name: "Lee", occupation: "Nurse" }],
		[{ Id: 349, first_name: "Ryan", last_name: "Miller", occupation: "Journalist" }, { Id: 55, first_name: "Mason", last_name: "Martin", occupation: "Journalist" }],
		[],
		[{ Id: 266, first_name: "James", last_name: "Wilson", occupation: "Programmer" }],
		[],
		[{ Id: 408, first_name: "Levy", last_name: "Williams", occupation: "Teacher" }, { Id: 181, first_name: "Mason", last_name: "Clark", occupation: "Teacher" }, { Id: 77, first_name: "Ethan", last_name: "Harris", occupation: "Teacher" }],
		[{ Id: 163, first_name: "Eve", last_name: "Thompson", occupation: "Physicist" }],
		[{ Id: 502, first_name: "Dana", last_name: "Jones", occupation: "Farmer" }],
		//skip 14 for test
		[{ Id: 87, first_name: "Bob", last_name: "Sponge", occupation: "Comedian" }],
		[{ Id: 227, first_name: "Bryan", last_name: "Taylor", occupation: "Pilot" }],
		[{ Id: 608, first_name: "Henry", last_name: "Moore", occupation: "Hairdresser" }],
		[{ Id: 66, first_name: "Eve", last_name: "White", occupation: "Engineer" }]
	], new Linq(occupations).groupJoin(peopleList2, o => o.id, p => p.occupation_id,
		(a, b) => b.select(x => new Object({ Id: x.Id, first_name: x.first_name, last_name: x.last_name, occupation: a.name }))
	),
		function (a, b) {
			return Linq.from(a).sequenceEqual(b,
				function (x, y) {
					return x.Id === y.Id && x.first_name === y.first_name && x.last_name === y.last_name && x.occupation === y.occupation;
				})
		}
	)

	.sequencesAreEqual("", [
		"Actors: Logan Anderson, Eve Johnson",
		"Business Brokers: Mason Lewis, Ezra Davis",
		"Musicians: Bob Dylan, Jack Garcia",
		"Composers: Ethan Thomas",
		"Accountants: Mark Brown, Tom Smith",
		"Nurses: Dana Lee",
		"Journalists: Ryan Miller, Mason Martin",
		"Bitchs: ",
		"Programmers: James Wilson",
		"Suckers: ",
		"Teachers: Levy Williams, Mason Clark, Ethan Harris",
		"Physicists: Eve Thompson",
		"Farmers: Dana Jones",
		//skip 14 for test
		"Comedians: Bob Sponge",
		"Pilots: Bryan Taylor",
		"Hairdressers: Henry Moore",
		"Engineers: Eve White"
	], new Linq(occupations).groupJoin(peopleList2, o => o.id, p => p.occupation_id,
		(a, b) => a.name + "s: " + b.select(e => e.first_name + " " + e.last_name).toArray().join(", ")
	));