/*!
 * File: src/errors.js
 */
class Errors {
	/*
	* Error messages
	*/
	static #_errorMessages = Object.freeze({
		ALL_MUST_BE_ITERABLE: "All arguments must be iterable",
		ARGUMENT_MUST_NOT_BE_NULL_key: "key argument MUST NOT be null",
		INPUT_SEQUENCE_CONTAINS_MORE_THAN_ONE_ELEMENT: "The input sequence contains more than one element",
		MORE_THAN_ELEMENT_SEQUENCE_SATISFIES_THE_CONDITION: "More than one element satisfies the condition in predicate",
		MUST_BE_NON_NEGATIVE_INTEGER_count: "count must be a non negative integer",
		MUST_BE_NON_NEGATIVE_INTEGER_factor: "factor must be a non negative integer",
		MUST_BE_NON_NEGATIVE_INTEGER_index: "index must be a non negative integer",
		MUST_BE_FUNCTION_OR_NULLISH_collectionSelector: "collectionSelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_comparer: "comparer must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_elementSelector: "elementSelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_equalityComparer: "equalityComparer must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer: "keyEqualityComparer must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_keySelector: "keySelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_leftKeySelector: "leftKeySelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_predicate: "predicate must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_resultSelector: "resultSelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_rightKeySelector: "rightKeySelector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_selector: "selector must be a function or nullish",
		MUST_BE_FUNCTION_OR_NULLISH_valueSelector: "valueSelector must be a function or nullish",
		MUST_BE_FUNCTION_accumulator: "accumulator must be a function",
		MUST_BE_FUNCTION_callback: "callback must be a function",
		MUST_BE_FUNCTION_predicate: "predicate must be a function",
		MUST_BE_FUNCTION_transform: "transform must be a function",
		MUST_BE_INTEGER_count: "count must be an integer",
		MUST_BE_INTEGER_start: "start must be an integer",
		MUST_BE_ITERABLE_iterable: "'iterable' argument must be iterable",
		MUST_BE_ITERABLE_iterable1: "iterable1 must be iterable",
		MUST_BE_ITERABLE_iterable2: "iterable2 must be iterable",
		MUST_BE_ITERABLE_rightIterable: "rightIterable must be iterable",
		MUST_BE_ITERABLE_secondIterable: "secondIterable must be iterable",
		MUST_BE_NUMBER_all_sequence_elements: "At least one of the sequence's element is not a number",
		NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate: "No element satisfies the condition in predicate",
		OUT_OF_RANGE_index: "index is out of range",
		PRODUCES_DUPLICATE_KEYS_keySelector: "keySelector produces duplicate keys",
		SEQUENCE_IS_EMPTY: "The sequence is empty",
	});

	/**
	 * Exposes the error messages for better unit-test coding and other.
	 */
	static get Messages() { return this.#_errorMessages; }
}

export default Errors;
export { Errors };