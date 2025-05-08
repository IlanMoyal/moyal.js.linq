/*!
 * File: src/linqGroup.js
 */

import { Linq } from "./Linq.js";
import { Errors } from "./Errors.js";

/**
 * Represents a group of elements sharing a common key,
 * typically used in LINQ operations like `groupBy` or `groupJoin`.
 * This class is iterable and inherits all LINQ capabilities.
 */
class LinqGroup extends Linq {
	#_key = null;

	/**
	 * Initializes a new instance of LinqGroup, wrapping a group with a specific key.
	 * @param {any} key - The key that is common to the group's elements.
	 * @param {Iterable<any>} iterable - An iterable of grouped items.
	 * @param {any} thisArg - Optional `this` context for callback usage.
	 */
	constructor(key, iterable, thisArg) {
		if (key == null) { 
			throw new Error(Errors.Messages.ARGUMENT_MUST_NOT_BE_NULL_key); 
		}
		super(iterable, thisArg);
		this.#_key = key;
	}

	/**
	 * Gets the key shared by all elements in this group.
	 * @returns {any}
	 */
	get key() { return this.#_key; }

	/**
	 * Returns a string representation of the group, including its key.
	 *
	 * @returns {string} A string in the format: `LinqGroup (key=...)`.
	 */
	toString() {
		return `LinqGroup (key=${this.#_key})`;
	}
}

export { LinqGroup };