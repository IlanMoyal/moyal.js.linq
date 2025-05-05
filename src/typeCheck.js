/*!
* File: src/typeCheck.js
*/

/**
 * Utility class for runtime type checking.
 */
class TypeCheck {
	/**
	 * Checks if the value is a number (primitive or Number object).
	 * @param {any} obj
	 * @returns {boolean}
	 */
	static isNumber(obj) { 
		return typeof obj === "number" || Object.prototype.toString.call(obj) === "[object Number]";
	}

	/**
	 * Checks if the value is a bigint (primitive or BigInt object).
	 * @param {any} obj
	 * @returns {boolean}
	 */
	static isBigInt(obj) { return typeof obj === "bigint" || Object.prototype.toString.call(obj) === "[object BigInt]"; }
	
	/**
	 * Checks if the value is an integer (number or bigint),
	 * optionally applying a custom predicate.
	 * @param {any} obj
	 * @param {(n: number|bigint) => boolean} [additionalPredicate]
	 * @returns {boolean}
	 */
	static isIntegral(obj, additionalPredicate) { 
		const isIntegral =
			this.isBigInt(obj) ||
			(this.isNumber(obj) && Math.floor(obj) === obj);
		return isIntegral && (additionalPredicate == null || additionalPredicate(obj) === true); 
	}

	/**
	 * Checks if the object is iterable (has a `[Symbol.iterator]` method).
	 * @param {any} obj
	 * @returns {boolean}
	 */
	static isIterable(obj) {
		return this.isFunctionOrGeneratorFunction(obj?.[Symbol.iterator]);
	}

	/**
	 * Checks if the value is a standard function.
	 * @param {any} obj
	 * @returns {boolean}
	 */
	static isFunction(obj) {
		const type = typeof obj;
		return (type === "object" || type === "function") && Object.prototype.toString.call(obj) === "[object Function]";
	}

	/**
	 * Checks if the value is a function or a generator function.
	 * @param {any} obj
	 * @returns {boolean}
	 */
	static isFunctionOrGeneratorFunction(obj) {
		const type = typeof obj;
		const tag = Object.prototype.toString.call(obj);
		return (type === "object" || type === "function") && (tag === "[object Function]" || tag === "[object GeneratorFunction]");
	}
}

export default TypeCheck;

export { TypeCheck };
