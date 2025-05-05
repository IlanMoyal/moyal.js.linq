/*!
 * File: src/linqOrder.js
 */

import TypeCheck from "./typeCheck.js";
import Linq from "./Linq.js";
import Errors from "./errors.js";

/**
 * Represents a LINQ-ordered iterable, allowing chained sorting with `thenBy` and `thenByDescending`.
 */
class LinqOrder extends Linq {
	static #_defaultComparer = (obj1, obj2) => obj1 > obj2 ? 1 : (obj1 < obj2 ? - 1 : 0);

	#_thisArg = null;
	#_iterable = null;
	#_orderByChain = [];

	/**
	 * Initializes a new instance of LinqOrder used for sorting operations.
	 * Returned by `orderBy()` or `orderByDescending()`.
	 * 
	 * @param {Iterable<any>} iterable - The iterable to be wrapped.
	 * @param {Function|null} keySelector - Function to extract key from each item (optional).
	 * @param {Function|null} comparer - Function to compare keys (optional).
	 * @param {boolean} desc - If `true`, applies descending order.
	 * @param {any} thisArg - The context (`this`) for user-defined callbacks.
	 * @throws {Error} If `keySelector` or `comparer` is invalid.
	 */
	constructor(iterable, keySelector, comparer, desc, thisArg) {
		super(iterable, thisArg);
		if (keySelector != null && !TypeCheck.isFunction(keySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector); }
		if (comparer != null && !TypeCheck.isFunction(comparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer); }

		this.#_iterable = iterable;
		this.#_thisArg = thisArg;
		this.#_orderByChain = [LinqOrder.#_createOrderByPredicate(keySelector, comparer, desc ? -1 : 1)];
	}

	static #_injectThenBy(instance, keySelector, comparer, desc) {
		if (keySelector != null && !TypeCheck.isFunction(keySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector); }
		if (comparer != null && !TypeCheck.isFunction(comparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer); }
		instance.#_orderByChain.push(this.#_createOrderByPredicate(keySelector, comparer, desc ? -1 : 1));
		return instance;
	}

	static #_createOrderByPredicate(keySelector, comparer, factor) {
		/* no need for this arg because "this" pointer already set properly */
		comparer = comparer ?? this.#_defaultComparer;
		return keySelector == null ? function (a, b) { return factor * comparer(a, b); } : function (a, b) { return factor * comparer(keySelector(a), keySelector(b)) };
	}

	#_createPredicateForOrderByChain(thisArg, predicateChain) {
		return function (a, b) {
			for (const p of predicateChain) {
				const res = p.call(thisArg, a, b);
				if (res != 0) { return res; }
			}
			return 0;
		}
	}

	/**
	 * Overrides the parent implementation of the iterable protocol, by applying the order by chain within it.
	 * 
	 * @returns {Generator}
	 */
	*[Symbol.iterator]() {
		/* we have to sort, optionally using predicate of OrderBy and optionally multiple ThenBy  */
		yield* Array.from(this.#_iterable).sort(this.#_createPredicateForOrderByChain(this.#_thisArg ?? this, this.#_orderByChain));
	}

	/**
	 * Performs a subsequent ordering of the elements in this sequence in ascending order, optionally by using the specified keySelector and comparer.
	 * A call to orderBy/orderByDescending must be made before changing other calls to thenBy/thenByDescending.
	 * This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.
	 * @param {Function} [keySelector] - An optional function to extract a key from an element. By default the element is used as the key.
	 * @param {Function} [comparer] - An optional comparer to compare keys. By default a simple comparison is made.
	 * @returns {Linq} The elements of the sequence in ascending subsequent order, optionally by using the specified keySelector and comparer.
	 * @throws A call to orderBy/orderByDescending must come before calling to thenBy/thenByDescending.
	 * @throws keySelector must be a function or nullish
	 * @throws comparer must be a function or nullish
	 */
	thenBy(keySelector, comparer) { return LinqOrder.#_injectThenBy(this, keySelector, comparer, false); }

	/**
	 * Performs a subsequent ordering of the elements in this sequence in descending order, optionally by using the specified keySelector and comparer.
	 * A call to orderBy/orderByDescending must be made before changing other calls to thenBy/thenByDescending.
	 * This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.
	 * @param {Function} [keySelector] - An optional function to extract a key from an element. Ny default the element is used as the key.
	 * @param {Function} [comparer] - An optional comparer to compare keys. By default a simple comparison is made.
	 * @returns {Linq} The elements of the sequence in descending subsequent order, optionally by using the specified keySelector and comparer.
	 * @throws {Error} A call to orderBy/orderByDescending must come before calling to thenBy/thenByDescending.
	 * @throws {Error} keySelector must be a function or nullish
	 * @throws {Error} comparer must be a function or nullish
	 */
	thenByDescending(keySelector, comparer) { return LinqOrder.#_injectThenBy(this, keySelector, comparer, true); }
}

export default LinqOrder;

export { LinqOrder };
