/* 
 * File: test/moyal.test.js
 *
 * This file should be imported by unit tests.
 */


/* ensures existence of globalThis */
import port from "../scripts/include/portability.js";
port.fixGlobal();

(function (global) {global.moyal = global.moyal || {};})(globalThis);

if (!moyal.test) {
	try {
		moyal.test = await (typeof window !== 'undefined'
		  ? import('https://cdn.jsdelivr.net/npm/@moyal/js-test@1.1.1/dist/moyal.test.mjs')
		  : import('@moyal/js-test'));
	  } catch (e) {
		console.error("Failed to load test framework:", e);
		throw e;
	  }
}

export default moyal.test;