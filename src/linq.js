/*!
 * File: src/linq.js
 */

import Errors from "./errors.js";
import TypeCheck from "./typeCheck.js";
import BuildInfo from "./auto-generated/build-info.js";
import Statistics from "./linqStatistics.js";

let LinqOrder;
let LinqGroup;

class Linq {
    static __setup(linqOrderClass, linqGroupClass) {
        LinqOrder = linqOrderClass;
        LinqGroup = linqGroupClass;
    }

    /* basics and defaults */
    static #_defaultComparer = (obj1, obj2) => obj1 > obj2 ? 1 : (obj1 < obj2 ? - 1 : 0);
    static #_defaultEqualityComparer = (obj1, obj2) => obj1 === obj2;
    static #_defaultSelector = (element) => element;
    static #_defaultResultSelector(...args) {
        return args.length > 1 ? args : args[0];
    }
    static *#_createSimpleGenerator(iterable) { for (let item of iterable) { yield item; } }
    
    /**
     * Returns the version of this LINQ library.
     * This is a read-only property used for diagnostics or compatibility checks.
     * @returns {string} Semantic version string.
     */
    static get Version() {
        return BuildInfo.version;
    }

    /*
    * Instance implementation starts here.
    */
    #_iterable = null;
    #_thisArg = null;
    
    /**
     * Initialize a new instance of Linq object and wrap the specified iterable within it.
     * @param {Iterable<any>} iterable - An iterable object (e.g. Array, string, Map, Set...)
     * @param {any} thisArg - A "this" pointer to be applied when calling user's callbacks.
     * @throws {Error} `iterable` argument must be iterable
     */
    constructor(iterable, thisArg) {
        if (!TypeCheck.isIterable(iterable)) { 
            throw new Error(Errors.Messages.MUST_BE_ITERABLE_iterable); 
        }
        this.#_iterable = iterable;
        this.#_thisArg = thisArg;
    }

    /**
     * Makes this object iterable.
     */
    *[Symbol.iterator]() {
        for (let item of this.#_iterable) {
            yield item;
        }
    }

    /**
     * Wrap the specified iterable with Linq.
     * @param {Iterable} iterable - An iterable object.
     * @param {any} [thisArg] - An object to be used as `this` pointer in callback calls.
     */
    static from(iterable, thisArg) { return new this(iterable, thisArg); }

    /**
     * Applies an accumulator function over the sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
     * @param {any} seed - The initial accumulator value. The first parameter is the current sequence item. The second parameter is the value accumulated so far. The third parameter is the index of the current item (the first parameter) in the sequence.
     * @param {Function} accumulator - An accumulator function to be invoked on each element.
     * @param {Function} [resultSelector] - An optional function to transform the final accumulator value into the result value.
     * @returns {any} The transformed final accumulator value.
     * @throws `accumulator` must be a function
     * @throws `resultSelector` must be a function or nullish
     */
    aggregate(seed, accumulator, resultSelector) { return Linq.#_aggregate(this.#_thisArg, seed, this, accumulator, resultSelector); }

    static #_aggregate(thisArg, seed, iterable, accumulator, resultSelector) {
        if (!TypeCheck.isFunction(accumulator)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_accumulator); }
        if (resultSelector != null && !TypeCheck.isFunction(resultSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector); }

        thisArg = thisArg ?? this;

        resultSelector = resultSelector ?? this.#_defaultResultSelector;
        let accumulatedSoFar = seed, index = 0;
        for (let item of iterable) {
            accumulatedSoFar = accumulator.call(thisArg, item, accumulatedSoFar, index);
            index++;
        }
        return resultSelector.call(thisArg, accumulatedSoFar);
    }

    /**
     * Determines whether all elements of the sequence satisfy a condition.
     * @param {Function} predicate - A function to test each source element for a condition; The first parameter is a source element, the second parameter represents the index of the source element in the sequence.
     * @returns {boolean} true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
     * @throws `predicate` must be a function.
     */
    all(predicate) { return Linq.#_all(this.#_thisArg, this, predicate); }

    static #_all(thisArg, iterable, predicate) {
        if (!TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_predicate); }

        thisArg = thisArg ?? this;

        let index = 0;
        for (let item of iterable) {
            if (predicate.call(thisArg, item, index) !== true) { return false; }
            index++;
        }
        return true;
    }

    /**
     * Determines whether any element of the sequence exists or satisfies a condition.
     * @param {Function} [predicate] - A function to test each source element for a condition; The first parameter is a source element, the second parameter represents the index of the source element in the sequence.
     * @returns {boolean} true if the sequence contains any elements; otherwise, false. BUT In case that a predicate was specified: true if the sequence is not empty and at least one of its elements passes the test in the specified predicate; otherwise, false.
     * @throws `predicate` must be a function or nullish.
     */
    any(predicate) { return Linq.#_any(this.#_thisArg, this, predicate); }

    static #_any(thisArg, iterable, predicate) {
        if (predicate != null && !TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate); }

        thisArg = thisArg ?? this;

        let index = 0;
        for (let item of iterable) {
            if (predicate == null || predicate.call(thisArg, item, index) === true) { return true; }
            index++;
        }
        return false;
    }

    /**
     * Appends a value to the end of the sequence. The original sequence (the current) is not changed.
     * @param {any} value - The value to be appended to the returned sequence.
     * @returns {Linq} A sequence consist of the current sequence plus the specified value.
     */
    append(value) { return Linq.#_append(this.#_thisArg, this, value); }

    static #_append(thisArg, iterable, value) { return new this(this.#_appendGen(thisArg, iterable, value)); }

    static *#_appendGen(thisArg, iterable, value) {
        for (let item of iterable) { yield item; }
        yield value;
    }

    /**
     * Computes the average of the sequence of numeric values. 
     * If the sequence is empty or at least one element of the sequence is not a number, the return value is undefined.
     * @returns {number | undefined} The numeric average of the sequence,or undefined if the sequence contains at least oneitem that is not a number.
     */
    average() { return Linq.#_average(this.#_thisArg, this); }

    static #_average(thisArg, iterable) {
        let sum = 0, count = 0;
        for (let item of iterable) {
            if (TypeCheck.isNumber(item)) {
                sum += item;
                count++;
            }
            else {
                sum = undefined;
                break;
            }
        }
        return (sum === undefined || count === 0) ? undefined : sum / count;
    }

    /**
     * Concatenates the current sequence with the specified sequences. Note that the current sequence is not modified.
     * @param {...Iterable} withIterables - Iterable sequences  be appended to the endof this sequence to form a single sequence.
     * @returns {Linq} An iterable that contains the concatenated elements of the current sequence with all input sequences. 
     * @throw At least one of the argument is not iterable.
     */
    concat(...withIterables) { return Linq.#_concat(this.#_thisArg, this, ...withIterables); }

    static #_concat(thisArg, iterable, ...withIterables) {
        /* the validation took place here and NOT within #_concat, because that is a deferred execution generator function*/
        for (let iter of withIterables) {
            if (!TypeCheck.isIterable(iter)) { throw new Error(Errors.Messages.ALL_MUST_BE_ITERABLE); }
        }
        return new this(this.#_concatGen(thisArg, ...[iterable, ...withIterables]), thisArg);
    }

    static *#_concatGen(thisArg, ...itrables) {
        for (let iter of itrables) {
            for (let item of iter) { yield item; }
        }
    }

    /**
     * Determines whether the sequence contains the specified element using strict equality comparison (===) or the specified equality comparer.
     * @param {any} value - The value to locate in the sequence.
     * @param {Function} [equalityComparer] - An optional equality comparer to compare values. The first parameter to the comparer is the specified value. The second parameter is an item from the sequence. The third parameter is the index of the item in the sequence.
     * @returns {boolean} true if the sequence contains the specified value using strict equality comparison (===) or the specified equality comparer; otherwise, false.
     * @throws `equalityComparer` must be a function or nullish. 
     */
    contains(value, equalityComparer = null) { return Linq.#_contains(this.#_thisArg, this, value, equalityComparer); }

    static #_contains(thisArg, iterable, value, equalityComparer) {
        if (equalityComparer != null && !TypeCheck.isFunction(equalityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer); }

        equalityComparer = equalityComparer ?? this.#_defaultEqualityComparer;

        let index = 0;
        for (let item of iterable) {
            if (thisArg == null ? equalityComparer(value, item, index) === true : equalityComparer.call(thisArg, value, item, index)) {
                return true;
            }
            index++;
        }
        return false;
    }

    /**
     * Returns the number of elements in a sequence.
     * @returns {number} The number of elements in a sequence.
     */
    count() { return Linq.#_count(this.#_thisArg, this); }

    static #_count(thisArg, iterable) {
        let c = 0;
        // eslint-disable-next-line no-unused-vars
        for (let _ of iterable) {
            c++;
        }
        return c;
    }

    /**
     * Returns the elements of the sequence, or a default valued singleton collection if the sequence is empty.
     * @param {any} defaultSingletonValue - A default value to be used as a singleton in the returned sequence if the current sequence is empty.
     * @returns {Iterable} The elements of the sequence, or a default valued singleton collection if the sequence is empty.
     */
    defaultIfEmpty(defaultSingletonValue) { return Linq.#_defaultIfEmpty(this.#_thisArg, this, defaultSingletonValue); }

    static #_defaultIfEmpty(thisArg, iterable, defaultSingletonValue) {
        return new this(this.#_defaultIfEmptyGen(thisArg, iterable, defaultSingletonValue), thisArg);
    }

    static *#_defaultIfEmptyGen(thisArg, iterable, defaultSingletonValue) {
        let yielded = false;
        for (let item of iterable) {
            yielded = true;
            yield item;
        }
        if (!yielded) { yield defaultSingletonValue; }
    }

    /**
     * Returns distinct elements from the sequence. 
     * @param {Function} [equalityComparer] - An equality comparer to compare values. 
     * @returns {Linq} Distinct elements from a sequence.
     * @throws `equalityComparer` must be a function or nullish
     */
    distinct(equalityComparer) { return Linq.#_distinct(this.#_thisArg, this, equalityComparer); }

    static #_distinct(thisArg, iterable, equalityComparer) {
        /* the validation took place here and NOT within #_distinctGen, because that is a deferred execution generator function*/
        if (equalityComparer != null && !TypeCheck.isFunction(equalityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer); }
        return new this(this.#_distinctGen(thisArg, iterable, equalityComparer), thisArg);
    }

    static *#_distinctGen(thisArg, iterable, equalityComparer) {
        equalityComparer = equalityComparer ?? this.#_defaultEqualityComparer;
        let arr = [];

        for (let item of iterable) {
            let found = false;
            for (var i = 0; !found && i < arr.length; i++) {
                found = (thisArg == null ? equalityComparer(item, arr[i]) === true : equalityComparer.call(thisArg, item, arr[i]) === true);
            }
            if (!found) { arr.push(item); }
        }

        for (let item of arr) { yield item; }
    }

    /**
     * Duplicate the sequence n number of times as specified factor parameter. 
     * If the factor is non integral number, the integer value less than or equal to the factor is used.
     * If factor is less than 1, an empty sequence returns. 
     * This function does not modify the current sequence.
     * otherwise the whole sequence is duplicated as 
     * @param {number} factor - The number of times to duplicate the 
     * @param {boolean} [inplace] - If set to true, duplicate each element and places the duplication right after this element, instead of duplicating the whole sequence and return them one after the other. The default is false.
     * @returns {Linq} A sequence consist of duplication of the current sequence.
     * @throws `factor` must be a non negative integer
     */
    duplicate(factor, inplace) { return Linq.#_duplicate(this.#_thisArg, this, factor, inplace); }

    static #_duplicate(thisArg, iterable, factor, inplace) {
        if (!TypeCheck.isNumber(factor) || Math.floor(factor) !== factor || factor < 0) { throw new Error(Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_factor); }
        return new this(this.#_duplicateGen(thisArg, iterable, factor, inplace === true), thisArg);
    }

    static *#_duplicateGen(thisArg, iterable, factor, inplace) {
        if (factor >= 1.0) {
            if (inplace === true) {
                for (let item of iterable) {
                    for (let i = 0; i < factor; i++) { yield item; }
                }
            }
            else {
                for (let i = 0; i < factor; i++) {
                    for (let item of iterable) { yield item; }
                }
            }
        }
    }

    /**
     * Returns the element at a specified index in the sequence.
     * @param {number} index - The zero-based index of the element to retrieve.
     * @returns {any} The element at a specified index in a sequence.
     * @throws `index` must be a non negative integer
     * @throws The sequence is empty
     * @throws `index` is out of range
     */
    elementAt(index) { return Linq.#_elementAt(this.#_thisArg, this, index, false, null); }

    /**
     * Returns the element at a specified index in the sequence, or the specified default value if the specified index is negative or out of range.
     * @param {number} index - The zero-based index of the element to retrieve.
     * @param {any} defaultValue - The default value to be returned.
     * @returns {any} The element at a specified index in the sequence, or the default value if the specified index is negative or out of range.
     * @throws `index` must be a non negative integer
     */
    elementAtOrDefault(index, defaultValue) { return Linq.#_elementAt(this.#_thisArg, this, index, true, defaultValue); }

    static #_elementAt(thisArg, iterable, index, hasDefaultValue, defaultValue) {
        if (!TypeCheck.isNumber(index) || Math.floor(index) != index || (index < 0 && hasDefaultValue !== true)) {
            throw new Error(Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_index);
        }
        let current = 0;
        for (let item of iterable) {
            if (current++ === index) { return item; }
        }

        if (hasDefaultValue === true) { return defaultValue; }

        throw new Error(current === 0 ? Errors.Messages.SEQUENCE_IS_EMPTY : Errors.Messages.OUT_OF_RANGE_index);
    }

    /**
     * Returns an empty sequence.
     * @param {any} thisArg - Optional object to be used as this argument in any call in the returned sequence.
     * @returns {Linq} An empty sequence.
     */
    static empty(thisArg) { return new this([], thisArg); }

    /**
     * Produces a set of unique items from the current sequence that do not appear in the specified scond sequence.
     * @param {Iterable} secondIterable - The second sequence.
     * @param {Function} [equalityComparer] - An equality comparer to be used to compare two items.
     * @returns {Linq} A set of unique items from the current sequence that do not appear in the specified scond sequence.
     * @throws `secondIterable` must be iterable
     * @throws `equalityComparer` must be a function or nullish
     */
    except(secondIterable, equalityComparer) { return Linq.#_van(this.#_thisArg, this, secondIterable, equalityComparer, "except"); } 

    static #_van(thisArg, sourceIterable, secondIterable, equalityComparer, algorithm) {
        /* #_van and #_vanGen are inner implementation of three functions:
            * except
            * intersect
            * union
            * 
            * The implementation tak under considation the possibility that the specified equalityComparer is not commotative!
            */
        if (!TypeCheck.isIterable(secondIterable)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_secondIterable); }
        if (equalityComparer != null && !TypeCheck.isFunction(equalityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer); }

        return new this(this.#_vanGen(thisArg, sourceIterable, secondIterable, equalityComparer, algorithm), thisArg);
    }

    static *#_vanGen(thisArg, sourceIterable, secondIterable, equalityComparer, algorithm) {
        let mask = algorithm === "except" ? false : (algorithm === "intersect" ? true : null /* union */);

        thisArg = thisArg ?? this;

        equalityComparer = equalityComparer ?? this.#_defaultEqualityComparer;
        let secondUnique = Array.from(this.#_distinctGen(thisArg, secondIterable
            /*, remove items that STRICTLY equal!!!
                * Here i'm not using the specified equalityComparer to eliminate duplicate
                * values from the secondIterable, because that comparer is not assured
                * to be commutative (that is, while a === b it is possible that b !== a).
                */
        ));
        let skip, passed = [];
        for (let a of sourceIterable) {
            skip = null;
            for (let p of passed) {
                /* It is possible that the equality comparer is not commotative, so:
                    * 1. values that passed we place in passed array and not in the filter array.
                    * 2. we strict compare to what was already passed. */
                if (a === p) {
                    skip = true;
                    break;
                }
            }

            if (mask != null /* not union */) {
                if (skip == null /* not already passed, so there´s no need to check against secondUnique */) {
                    skip = mask;
                    for (let b of secondUnique) {
                        if (equalityComparer.call(thisArg, a, b) === true) {
                            skip = !mask; /* */
                            break;
                        }
                    }
                }
            }
            else if (skip === null) { skip = false; }

            if (skip === false /*strict comparison!*/) {
                passed.push(a);
                yield a;
            }
        }

        if (mask === null /*union*/) {
            /* secondUnique contains unique items from the second iterable! */
            for (let b of secondUnique) {
                skip = false;
                for (let p of passed) {
                    /* The 'passed' array contains the unique items that passed from the first sequence.
                        * Because the equality comparer might be a not commotative comparer, in the call 
                        * we pass the item from the first sequence as the first parameter! */
                    if (equalityComparer.call(thisArg, p, b) === true) {
                        skip = true;
                        break;
                    }
                }

                if (skip === false) {
                    /* no need to add it to passed! */
                    yield b;
                }
            }
        }
    }

    /**
     * Returns the first element in the sequence, or the first element in the sequence that meets the specified condition, if such one was specified.
     * @param {Function} [predicate] - An optional function to test each element of the sequence for a condition; The first parameter is a source element, the second parameter is the index of the source element within the sequence.
     * @returns {any} The first element in the sequence, or the first element in the sequence that satisfies a specified condition, if such one was specified.
     * @throws `predicate` must be a function, null or undefined.
     * @throws The sequence is empty.
     * @throws No element satisfies the condition in predicate.
     */
    first(predicate) { return Linq.#_first(this.#_thisArg, this, predicate, false); }

    /**
     * Returns the first element of the sequence, or the first one that meets the specified condition, if such one was specified. A default value is returned if the sequence is empty or no element was found.
     * @param {any} defaultValue - The default value to return in case that sequence is empty, or none of the sequence items meets the specified condition. 
     * @param {Function} [predicate] - A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element.
     * @returns {any} The first element of the sequence, or the first one that meets the specified condition, if such one was specified. Or the specified default value if the sequence is empty or no element was found.
     * @throws `predicate` must be a function, null or undefined.
     */
    firstOrDefault(defaultValue, predicate) { return Linq.#_first(this.#_thisArg, this, predicate, true, defaultValue); }

    static #_first(thisArg, iterable, predicate, hasDefaultValue, defaultValue) {
        if (predicate != null && !TypeCheck.isFunction(predicate)) {
            throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate);
        }

        thisArg = thisArg ?? this;

        let index = 0;
        for (let item of iterable) {
            if (predicate == null || predicate.call(thisArg, item, index) === true) { return item; }
            index++;
        }

        if (hasDefaultValue) { return defaultValue; }
        throw new Error(index > 0 && predicate != null ? Errors.Messages.NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate: Errors.Messages.SEQUENCE_IS_EMPTY);
    }

    /**
     * Iterates through all elements in the sequence, and call the specified function for each.
     * @param {Function} callback - A callback function to be called for each element of the sequence until all elements of the sequence processed, 
     * or until a boolean false value was returned by the function; 
     * The first parameter to the callback is an element of the sequence, the second parameter represents the index of the element within the sequence.
     * The callback might return false to stop the iteration.
     * @throws `callback` must be a function
     */
    forEach(callback) { return Linq.#_forEach(this.#_thisArg, this, callback); }

    static #_forEach(thisArg, iterable, callback) {
        if (!TypeCheck.isFunction(callback)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_callback); }

        thisArg = thisArg ?? this;

        let index = 0;
        for (let item of iterable) {
            let cont = callback.call(thisArg, item, index);
            index++;
            if (cont === false /* explicity stop the loop */) { break; }
        }
    }

    /**
     * 
     * @param {any} keySelector key creator
     * @param {any} [elementSelector] source element to group element: groupElementType func (sourceElementType)
     * @param {any} [resultSelector] resultType func(key, groupElementType)
     * @param {any} [keyEqualityComparer] bool (a, b)
     */
    groupBy(keySelector, elementSelector, resultSelector, keyEqualityComparer) {
        return Linq.#_groupBy(this.#_thisArg, this, keySelector, elementSelector, resultSelector, keyEqualityComparer);
    }

    static #_groupBy(thisArg, iterable, keySelector, elementSelector, resultSelector, keyEqualityComparer) {
        if (keySelector != null && !TypeCheck.isFunction(keySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector); }
        if (elementSelector != null && !TypeCheck.isFunction(elementSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_elementSelector); }
        if (resultSelector != null && !TypeCheck.isFunction(resultSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector); }
        if (keyEqualityComparer != null && !TypeCheck.isFunction(keyEqualityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer); }

        return new this(this.#_groupByGen(thisArg, iterable, keySelector, elementSelector, resultSelector, keyEqualityComparer), thisArg);
    }

    static *#_groupByGen(thisArg, iterable, keySelector, elementSelector, resultSelector, keyEqualityComparer) {
        keySelector = keySelector ?? this.#_defaultSelector;
        elementSelector = elementSelector ?? this.#_defaultSelector;
        resultSelector = resultSelector ?? this.#_defaultResultSelector;
        keyEqualityComparer = keyEqualityComparer ?? this.#_defaultEqualityComparer;

        thisArg = thisArg ?? this;
        let segments = []; /* Array and not map because the keys might be objects, and Map does not support getHashCode, there is no efficiency benefit in using Map. */
        let index = 0;
        for (let item of iterable) {
            let key = keySelector.call(thisArg, item, index);
            let element = elementSelector.call(thisArg, item, index);
            let appended = false;
            for (let seg of segments) {
                if (keyEqualityComparer.call(thisArg, key, seg.key, index) === true) {
                    seg.elements.push(element);
                    appended = true;
                    break;
                }
            }
            if (!appended) {
                segments.push({ key: key, elements: [element] });
            }
            index++;
        }
        let groups = [];
        for (let seg of segments) {
            groups.push(resultSelector.call(thisArg, new LinqGroup(seg.key, seg.elements, thisArg)));
        }

        yield* groups;
    }

    /**
     * Correlates the elements of two sequences based on matching keys: this sequence (which considered to be the left one) and the specified sequence (the right). 
     * The result sequence contains each and every element from the left sequence along with its matched-key elements, group together, from the right.
     * The order of the result sequence keeps the order of the left sequence (this sequence), and for each match from the right sequence the order is also maintained.
     * It is possible to control the returned object by specifying a result selector which accepts the element from the left (this sequence) and its matched element from the right grouped as a single Linq object.
     * @param {Iterable} rightIterable - The right side sequence to group-join to the left sequence (this one).
     * @param {Function} [leftKeySelector] - An optional function to extract the join key from each element of the left sequence (this one). By default the element itself is used as both key and value.
     * @param {Function} [rightKeySelector] - An optional function to extract the join key from each element of the right sequence. By default the element itself is used as both key and value.
     * @param {Function} [resultSelector] - An optional function to create a result element from matching elements, a single element from the left (this sequence) and a group of elements from the right (the specified sequence). By default, the result element is an array of these two.
     * @param {Function} [keyEqualityComparer] - An optional function to check the equality of two keys. By default a strict comparison is made (===).
     * @returns {Linq} An iterable object that has elements that are obtained by performing an group join on the two sequences.
     * @throws `rightIterable` must be iterable.
     * @throws `leftKeySelector` must be a function or nullish.
     * @throws `rightKeySelector` must be a function or nullish
     * @throws `resultSelector` must be a function or nullish
     * @throws `keyEqualityComparer` must be a function or nullish
     */
    groupJoin(rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        return Linq.#_groupJoin(this.#_thisArg, this, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer);
    }

    static #_groupJoin(thisArg, iterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        if (!TypeCheck.isIterable(rightIterable)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_rightIterable); }
        if (leftKeySelector != null && !TypeCheck.isFunction(leftKeySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_leftKeySelector); }
        if (rightKeySelector != null && !TypeCheck.isFunction(rightKeySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_rightKeySelector); }
        if (resultSelector != null && !TypeCheck.isFunction(resultSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector); }
        if (keyEqualityComparer != null && !TypeCheck.isFunction(keyEqualityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer); }

        return new this(this.#_groupJoinGen(thisArg, iterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer), thisArg);
    }

    static *#_groupJoinGen(thisArg, leftIterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        leftKeySelector = leftKeySelector ?? this.#_defaultSelector;
        rightKeySelector = rightKeySelector ?? this.#_defaultSelector;
        resultSelector = resultSelector ?? this.#_defaultResultSelector;
        keyEqualityComparer = keyEqualityComparer ?? this.#_defaultEqualityComparer;
        thisArg = thisArg ?? this;

        for (let a of leftIterable) {
            let leftKey = leftKeySelector.call(thisArg, a);
            yield resultSelector.call(thisArg, a, new Linq(rightIterable).where(item => keyEqualityComparer.call(thisArg, leftKey, rightKeySelector.call(thisArg, item)) === true));
        }
    }

    /**
     * Produces a sequence of UNIQUE items that appear in this sequence as well as the specified sequence. The order of the items remains the same as it was in this sequence.
     * @param {Iterable} secondIterable - The second sequence.
     * @param {Function} [equalityComparer] - An equality comparer to be used to compare two items.
     * @returns {Linq} A sequence of UNIQUE items that ALSO appear in the specified sequence. The order of the items remains the same as it was in this sequence.
     * @throws `secondIterable` must be iterable
     * @throws `equalityComparer` must be a function or nullish
     */
    intersect(secondIterable, equalityComparer) { return Linq.#_van(this.#_thisArg, this, secondIterable, equalityComparer, "intersect"); }

    /**
     * Correlates the elements of two sequences based on matching keys: this sequence (which considered to be the left one) and the specified sequence (the right). 
     * The result sequence contains each element from the left sequence along with its matched-key element from the right - and only these.
     * The order of the result sequence keeps the order of the left sequence (this sequence), and for each match from the right sequence the order is also maintained.
     * @param {Iterable} rightIterable - The right side sequence to join to the left sequence (this one).
     * @param {Function} [leftKeySelector] - An optional function to extract the join key from each element of the left sequence (this one). By default the element itself is used as both key and value.
     * @param {Function} [rightKeySelector] - An optional function to extract the join key from each element of the right sequence. By default the element itself is used as both key and value.
     * @param {Function} [resultSelector] - An optional function to create a result element from two matching elements. By default, the result element is an array of the two matched elements.
     * @param {Function} [keyEqualityComparer] - An optional function to check the equality of two keys. By default a strict comparison is made (===).
     * @returns {Linq} An iterable object that has elements that are obtained by performing an inner join on the two sequences.
     * @throws `rightIterable` must be iterable.
     * @throws `leftKeySelector` must be a function or nullish.
     * @throws `rightKeySelector` must be a function or nullish
     * @throws `resultSelector` must be a function or nullish
     * @throws `keyEqualityComparer` must be a function or nullish
     */
    join(rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        return Linq.#_join(this.#_thisArg, this, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer);
    }

    static #_join(thisArg, iterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        if (!TypeCheck.isIterable(rightIterable)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_rightIterable); }
        if (leftKeySelector != null && !TypeCheck.isFunction(leftKeySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_leftKeySelector); }
        if (rightKeySelector != null && !TypeCheck.isFunction(rightKeySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_rightKeySelector); }
        if (resultSelector != null && !TypeCheck.isFunction(resultSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector); }
        if (keyEqualityComparer != null && !TypeCheck.isFunction(keyEqualityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keyEqualityComparer); }

        return new this(this.#_joinGen(thisArg, iterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer), thisArg);
    }

    static *#_joinGen(thisArg, leftIterable, rightIterable, leftKeySelector, rightKeySelector, resultSelector, keyEqualityComparer) {
        leftKeySelector = leftKeySelector ?? this.#_defaultSelector;
        rightKeySelector = rightKeySelector ?? this.#_defaultSelector;
        resultSelector = resultSelector ?? this.#_defaultResultSelector;
        keyEqualityComparer = keyEqualityComparer ?? this.#_defaultEqualityComparer;
        thisArg = thisArg ?? this;

        for (let a of leftIterable) {
            let leftKey = leftKeySelector.call(thisArg, a);
            for (let b of rightIterable) {
                let rightKey = rightKeySelector.call(thisArg, b);
                if (keyEqualityComparer.call(thisArg, leftKey, rightKey) === true) {
                    yield resultSelector.call(thisArg, a, b);
                }
            }
        }
    }

    /**
     * Returns the last element in a sequence, or the last element in the sequence that meets the specified condition, if specified.
     * @param {Function} [predicate] - A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element.
     * @returns {any} The last element in the specified sequence, or the last element in the sequence that satisfies a specified condition, if specified.
     * @throws `predicate` must be a function or nullish
     * @throws The sequence is empty
     * @throws No element satisfies the condition in predicate
     */
    last(predicate) { return Linq.#_last(this.#_thisArg, this, predicate, false); }

    /**
     * Returns the last element of the sequence, or the last one that meets the specified condition, if such one was specified. A default value is returned if the sequence is empty or no element was found.
     * @param {any} defaultValue - The default value to return in case that sequence is empty, or none of the sequence items meets the specified condition.
     * @param {Function} [predicate] - A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element.
     * @returns {any} The last element of the sequence, or the last one that meets the specified condition, if such one was specified. Or the specified default value if the sequence is empty or no element was found.
     * @throws `predicate` must be a function or nullish
     */
    lastOrDefault(defaultValue, predicate) { return Linq.#_last(this.#_thisArg, this, predicate, true, defaultValue); }

    static #_last(thisArg, iterable, predicate, hasDefaultValue, defaultValue) {
        if (predicate != null && !TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate); }
        thisArg = thisArg ?? this;
        let index = 0, lastSoFar, lastSoFarAssigned = false;
        for (let item of iterable) {
            if (predicate == null || predicate.call(thisArg, item, index) === true) {
                lastSoFarAssigned = true;
                lastSoFar = item;
            }
            index++;
        }

        if (lastSoFarAssigned) { return lastSoFar; }

        if (hasDefaultValue) { return defaultValue; }

        throw new Error(index > 0 && predicate != null ? Errors.Messages.NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate: Errors.Messages.SEQUENCE_IS_EMPTY);
    }

    /**
     * Returns the maximum value in the sequence. If the sequence is empty, the return value is undefined. If it contains a single value, it will be the maximum value, no matter what it is.
     * @param {Function} [comparer] - An optional function to compare two items from the sequence. The first parameter to this function is the first item, the second parameter is the second item, and the third parameter is the index of the SECOND item in the sequence.
     * If no compare function is passed, a default compare is used (>= operator). In this default compare, if one of the arguments is null or undefined, the result is undefined.
     * @returns {any} The maximum value of the sequence.
     * @throws `compare` must be a function or nullish
     */
    max(comparer) { return Linq.#_max(this.#_thisArg, this, comparer); }

    static #_max(thisArg, iterable, comparer) { return this.#_minMax(thisArg, iterable, comparer, 1); }







    /**
     * Returns the minimum value in the sequence. If the sequence is empty, the return value is undefined. If it contains a single value, it will be the minimum value, no matter what it is.
     * @param {Function} [comparer] - An optional function to compare two items from the sequence. The first parameter to this function is the first item, the second parameter is the second item, and the third parameter is the index of the SECOND item in the sequence.
     * If no compare function is passed, a default compare is used (>= operator). In this default compare, if one of the arguments is null or undefined, the result is undefined.
     * @returns {any} The minimum value of the sequence.
     * @throws `compare` must be a function or nullish
     */
    min(comparer) { return Linq.#_min(this.#_thisArg, this, comparer); }

    static #_min(thisArg, iterable, comparer) { return this.#_minMax(thisArg, iterable, comparer, -1); }

    static #_minMax(thisArg, iterable, comparer, compareFactor) {
        if (comparer != null && !TypeCheck.isFunction(comparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_comparer); }
        comparer = comparer ?? this.#_defaultComparer;

        let first = true, index = 0, soFar = undefined;
        thisArg = thisArg ?? this;
        for (let item of iterable) {
            if (first === true) {
                soFar = item;
                first = false;
            }
            else { soFar = compareFactor * comparer.call(thisArg, soFar, item, index) >= 0 ? soFar : item; }
            index++;
        }
        return soFar;
    }

    /**
     * Sorts the elements of the sequence in ascending order, optionally by using the specified keySelector and comparer.
     * This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.
     * @param {Function} [keySelector] - An optional function to extract a key from an element. My default the element is used as the key.
     * @param {Function} [comparer] - An optional comparer to compare keys. By default a simple comparison is made.
     * @returns {Linq} The elements of the sequence in ascending order, optionally by using the specified keySelector and comparer.
     * @throws `keySelector` must be a function or nullish
     * @throws `comparer` must be a function or nullish
     */
    orderBy(keySelector, comparer) { return new LinqOrder(this, keySelector, comparer, false, this.#_thisArg); }

    /**
     * Sorts the elements of the sequence in descending order, optionally by using the specified keySelector and comparer.
     * This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.
     * @param {Function} [keySelector] - An optional function to extract a key from an element. Ny default the element is used as the key.
     * @param {Function} [comparer] - An optional comparer to compare keys. By default a simple comparison is made.
     * @returns {Linq} The elements of the sequence in descending order, optionally by using the specified keySelector and comparer.
     * @throws `keySelector` must be a function or nullish
     * @throws `comparer` must be a function or nullish
     */
    orderByDescending(keySelector, comparer) { return new LinqOrder(this, keySelector, comparer, true, this.#_thisArg); }

    /**
     * Adds a value to the beginning of the sequence. The original sequence (the current) is not changed.
     * @param {any} value - The value to be added to the beginning of the returned sequence.
     * @returns {Linq} A sequence consist of the specified element, and then the items from the current sequence.
     */
    prepend(value) { return Linq.#_prepend(this.#_thisArg, this, value); }

    static #_prepend(thisArg, iterable, value) { return new this(this.#_prependGen(thisArg, iterable, value), thisArg); }

    static *#_prependGen(thisArg, iterable, value) {
        yield value;
        for (let item of iterable) { yield item; }
    }

    /**
     * Generates a sequence of integral numbers within a specified range.
     * @param {number} start - The value of the first integer in the sequence.
     * @param {number} count - The number of sequential integers to generate.
     * @param {any} [thisArg] - The object to be used as this pointer for subsequent LINQ calls.
     * @returns {Linq} A sequence of integral numbers within a specified range.
     * @throws `start` must be an integer
     * @throws `count` must be a non negative integer
     */
    static range(start, count, thisArg) {
        if (!TypeCheck.isNumber(start) || Math.floor(start) !== start) { throw new Error(Errors.Messages.MUST_BE_INTEGER_start); }
        if (!TypeCheck.isNumber(count) || Math.floor(count) !== count || count < 0) { throw new Error(Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count); }
        return new this(this.#_rangeGen(start, count), thisArg);
    }

    static *#_rangeGen(start, count) {
        while (count-- > 0) yield start++;
    }

    /**
     * Return a copy of this sequence without the nullish values (null or undefined).
     * @returns {Linq} A copy of this sequence without the nullish values (null or undefined).
     */
    removeNullishes() { return Linq.#_removeNullishes(this.#_thisArg, this); }

    static #_removeNullishes(thisArg, iterable) {
        return new this(this.#_removeNullishesGen(thisArg, iterable), thisArg);
    }

    static *#_removeNullishesGen(thisArg, iterable) {
        for (let item of iterable) {
            if ((item ?? null) === null) { continue; }
            yield item;
        }
    }

    /**
     * Generates a sequence that contains one repeated value.
     * @param {any} value - The value to be repeated.
     * @param {number} count - The number of times to repeat the value in the generated sequence.
     * @param {any} [thisArg] - The object to be used as this pointer for subsequent LINQ calls.
     * @returns {Linq} A sequence consist of the specified value repeated the specified count of times.
     * @throws `count` must be a non negative integer
     */
    static repeat(value, count, thisArg) {
        if (!TypeCheck.isNumber(count) || Math.floor(count) !== count || count < 0) { throw new Error(Errors.Messages.MUST_BE_NON_NEGATIVE_INTEGER_count); }
        return new this(this.#_repeat(thisArg, value, count), thisArg);
    }

    static *#_repeat(thisArg, value, count) {
        for (let i = 0; i < count; i++) { yield value; }
    }

    /**
     * Inverts the order of the elements in a sequence.
     * @returns {_sel.Linq} A copy of this sequence in reserve order.
     */
    reverse() { return Linq.#_reverse(this.#_thisArg, this); }

    static #_reverse(thisArg, iterable) { return new this(this.#_reverseGen(thisArg, iterable), thisArg); }

    static *#_reverseGen(thisArg, iterable) {
        let arr = [];
        for (let item of iterable) { arr.push(item); }
        for (let i = arr.length - 1; i >= 0; i--) 
            yield arr[i];
    }

    /**
     * Projects each element of this sequence into a new form.
     * @param {Function} [selector] - A n optional transform function to apply to each source element; The first parameter is the element, the second parameter represents the index of the source element. The default selector simply return the item that passed as parameter.
     * @returns {_self.Linq} A new sequence whose elements are the result of invoking the transform function on each element this sequence.
     * @throws `selector` must be a function or nullish
     */
    select(selector) { return Linq.#_select(this.#_thisArg, this, selector); }

    static #_select(thisArg, iterable, selector) {
        if (selector != null && !TypeCheck.isFunction(selector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_selector); }
        return new this(this.#_selectGen(thisArg, iterable, selector), thisArg);
    }

    static *#_selectGen(thisArg, iterable, selector) {
        thisArg = thisArg ?? this;
        selector = selector ?? this.#_defaultSelector;
        let index = 0;
        for (let item of iterable) {
            yield selector.call(thisArg, item, index);
            index++;
        }
    }

    /**
     * Projects each element as inner sequence, then flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. 
     * @param {Function} [collectionSelector] - A transform function to apply to each source element and SHOULD return an iterable object (the inner sequence). In this function:
     * The first parameter is the source element from this sequence. 
     * The second parameter represents the index of the source element within this sequence. 
     * The default selector simply returns the source element that passed as the first parameter.
     * @param {Function} [resultSelector] - A transform function to apply to each item of each inner sequence. In this function:
     * The first parameter is a item itself. 
     * The second parameter represents the index of this item within the inner sequence which is currently scanned. 
     * The third parameter is a reference to the inner sequence which is currently scanned. 
     * The forth parameter represents the index of the this inner sequence within the current sequence.* 
     * By default the selector simply returns the item that passed as parameter.
     * @returns {Linq} A sequence whose elements are the result of invoking the transform functions on each inner sequence and on each element of each inner sequence.
     * @throws `collectionSelector` must be a function or nullish
     * @throws `resultSelector` must be a function or nullish
     */
    selectMany(collectionSelector, resultSelector) { return Linq.#_selectMany(this.#_thisArg, this, collectionSelector, resultSelector); }

    static #_selectMany(thisArg, iterable, collectionSelector, resultSelector) {
        if (collectionSelector != null && !TypeCheck.isFunction(collectionSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_collectionSelector); }
        if (resultSelector != null && !TypeCheck.isFunction(resultSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_resultSelector); }
        return new this(this.#_selectManyGen(thisArg, iterable, collectionSelector, resultSelector), thisArg);
    }

    static *#_selectManyGen(thisArg, iterable, collectionSelector, resultSelector) {
        collectionSelector = collectionSelector ?? this.#_defaultSelector;
        resultSelector = resultSelector ?? this.#_defaultSelector;
        thisArg = thisArg ?? this;
        let index = 0;
        for (let outerItem of iterable) {
            let collection = collectionSelector.call(thisArg, outerItem, index);

            let innerIndex = 0;
            for (let innerItem of collection) {
                yield resultSelector.call(thisArg, innerItem, innerIndex, outerItem, index);
                innerIndex++;
            }

            index++;
        }
    }

    /**
     * Determines whether the current sequence is equal to the specified, according to an equality comparer.
     * @param {Iterable} secondIterable - The second sequence to compare to.
     * @param {Function} [equalityComparer] - An equality comparer to compare two items. The first parameter is the first item, the second parameter is the second item, and the third is the index of these items within the sequences.
     * @returns {boolean} true if the two sequences are of equal length and their corresponding elements are equal according to the equality comparer; otherwise, false.
     * @throws `secondIterable` must be iterable
     * @throws `equalityComparer` must be a function or nullish
     */
    sequenceEqual(secondIterable, equalityComparer) { return Linq.#_sequenceEqual(this.#_thisArg, this, secondIterable, equalityComparer); }

    static #_sequenceEqual(thisArg, firstIterable, secondIterable, equalityComparer) {
        if (!TypeCheck.isIterable(secondIterable)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_secondIterable); }
        if (equalityComparer != null && !TypeCheck.isFunction(equalityComparer)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_equalityComparer); }

        equalityComparer = equalityComparer ?? this.#_defaultEqualityComparer;

        let iter1 = this.#_createSimpleGenerator(firstIterable);
        let iter2 = this.#_createSimpleGenerator(secondIterable);
        thisArg = thisArg ?? this;
        let index = 0, f, s;
        do {
            f = iter1.next();
            s = iter2.next();

            if (
                (f.done ^ s.done)
                ||
                (f.done === false && s.done === false && equalityComparer.call(thisArg, f.value, s.value, index) !== true)
            ) {
                return false;
            }
            index++;
        } while (!f.done /* same as !s.done*/);
        return true;
    }

    /**
     * Returns the only element of the sequence, and throws an exception if there is not exactly one element in the sequence.
     * OR
     * Returns the only element of the sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
     * @param {Function} [predicate] - An optional function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element.
     * @returns {any} The single element of the input sequence OR The single element of the input sequence that satisfies the specified predicate.
     * @throws `predicate` must be a function or nullish
     * @throws The input sequence contains more than one element
     * @throws More than one element satisfies the condition in predicate
     * @throws The sequence is empty
     * @throws No element satisfies the condition in predicate
     */
    single(predicate) { return Linq.#_single(this.#_thisArg, this, predicate, false); }

    /**
     * Returns the only element of the sequence. If there is no element in the sequence, the specified defaultValue is returned. If the sequence contains more that a single element, an error is thrown.
     * OR
     * Returns the only element of the sequence, using the specified predicate to match the value. If no element matched, the specified defaultValue is returned. If more than a single element matched, an error is thrown.
     * @param {any} defaultValue - The defaultValue.
     * @param {Function} [predicate] - An optional function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element.
     * @returns {any} The single element of the input sequence OR The single element of the input sequence that satisfies the specified predicate, or the defaultValue.
     * @throws predicate must be a function or nullish
     * @throws The input sequence contains more than one element
     * @throws More than one element satisfies the condition in predicate
     */
    singleOrDefault(defaultValue, predicate) { return Linq.#_single(this.#_thisArg, this, predicate, true, defaultValue); }

    static #_single(thisArg, iterable, predicate, hasDefaultValue, defaultValue) {
        if (predicate != null && !TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_predicate); }

        let result, resultCount = 0, index = 0;

        thisArg = thisArg ?? this;

        for (let item of iterable) {
            if (predicate == null || predicate.call(thisArg, item, index) === true) {
                resultCount++;
                if (resultCount > 1) {
                    throw new Error(predicate == null ? Errors.Messages.INPUT_SEQUENCE_CONTAINS_MORE_THAN_ONE_ELEMENT: Errors.Messages.MORE_THAN_ELEMENT_SEQUENCE_SATISFIES_THE_CONDITION);
                }
                result = item;
            }
            index++;
        }

        if (resultCount === 0) {
            if (hasDefaultValue === true) { result = defaultValue; }
            else {
                throw new Error(index === 0 ? Errors.Messages.SEQUENCE_IS_EMPTY: Errors.Messages.NO_ELEMENT_SATISFIES_THE_CONDITION_IN_predicate);
            }
        }

        return result;
    }

    /**
     * Bypasses a specified number of elements in the sequence and then returns the remaining elements.
     * @param {number} count - The number of elements to skip before returning the remaining elements.
     * @returns {Linq} A new sequence that contains the elements that occur after the specified index in the sequence.
     * @throws `count` must be an integer
     */
    skip(count) { return Linq.#_skip(this.#_thisArg, this, count) }

    static #_skip(thisArg, iterable, count) {
        if (!TypeCheck.isIntegral(count)) { throw new Error(Errors.Messages.MUST_BE_INTEGER_count); }
        return new this(this.#_skipGen(thisArg, iterable, count), thisArg);
    }

    static *#_skipGen(thisArg, iterable, count) {
        let i = 0;
        for (let item of iterable) {
            if (i++ < count) { continue; }
            else { yield item; }
        }
    }

    /**
     * Returns a new sequence that contains the elements from the current sequence with the last count elements omitted.
     * @param {number} count - Number of element from the end of this sequence to omit.
     * @returns {Linq} A new sequence that contains the elements from the current sequence with the last count elements omitted.
     * @throws `count` must be an integer
     */
    skipLast(count) { return Linq.#_skipLast(this.#_thisArg, this, count); }

    static #_skipLast(thisArg, iterable, count) {
        if (!TypeCheck.isIntegral(count)) { throw new Error(Errors.Messages.MUST_BE_INTEGER_count); }
        return new this(this.#_skipLastGen(thisArg, iterable, count), thisArg);
    }

    static *#_skipLastGen(thisArg, iterable, count) {
        if (count <= 0) { yield* iterable; }
        else {
            let all = Array.from(iterable);
            for (let i = 0; i < all.length - count; i++) {
                yield all[i];
            }
        }
    }

    /**
     * Bypasses elements in the sequence as long as a specified condition is true and then returns the remaining elements.
     * @param {Function} predicate - A function to test each source element for a condition; The first parameter to this predicate is the source element, the second parameter represents the index of the source element.
     * @returns {Linq} A new sequence that contains the elements from the sequence starting at the first element in the sequence that does not pass the test specified by predicate.
     * @throws `predicate` must be a function
     */
    skipWhile(predicate) { return Linq.#_skipWhile(this.#_thisArg, this, predicate); }

    static #_skipWhile(thisArg, iterable, predicate) {
        if (!TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_predicate); }
        return new this(this.#_skipWhileGen(thisArg, iterable, predicate), thisArg);
    }

    static *#_skipWhileGen(thisArg, iterable, predicate) {
        let skip = true, index = 0;
        thisArg = thisArg ?? this;
        for (let item of iterable) {
            if (!skip) { yield item; }
            else if (predicate.call(thisArg, item, index++) !== true) {
                skip = false;
                yield item;
            }
        }
    }

    /**
     * Calculates the following statistic measurements for the sequence of numbers: 
     * - count: The count numbers.
     * - minimum: The minimal number in the sequence.
     * - maximum: The maximal number in the sequence.
     * - range: The range of the sequence, that is the difference between the maximal value and the minimal value.
     * - average: The average number of the sequence.
     * - summary: The summary of the sequence.
     * - variance: The variance of the sequence
     * - standard deviation: The standard deviation of the sequence (which is a square root of the variance).
     * 
     * If extended was set to true, or more specifically extended.median and/or extended.mode were set to true.
     * - mode: The value that appears most frequently in the sequence. If more than a single value have the same maximum repetition count, an array of all "modes" returns. If all items have the same repetition count, `undefined` is returned.
     * - median: A numeric value that "splits" the sequence to two, so half of the elements comes before it, and half of the elements comes after it.
     * 
     * @param {(boolean | {median: boolean, mode: boolean})} extended - Determines whether to calculates extended (additional) statistic values: mode, median, variance, standard.
     * @returns {Linq.Statistics} - The statistics result.
     */
    statistics(extended) {
        return Linq.#_statistics(this.#_thisArg, this, extended);
    }

    static #_statistics(thisArg, iterable, extended) {
        /*
         * Basic calculations:
         * - count
         * - minimum
         * - maximum
         * - summary
         * - average
         * - range
         * - variance
         * - standard deviation
         *
         * Extended calculations (if requested):
         * - mode
         * - median
         */
    
        const result = {
            count: 0,
            minimum: undefined,
            maximum: undefined,
            summary: 0,
            average: undefined,
            range: undefined,
            mode: undefined,
            median: undefined,
            variance: undefined,
            standardDeviation: undefined
        };
    
        // Prepare collections only if extended mode requested
        const values = (extended === true || extended?.median) ? [] : null;    // For median
        const freqMap = (extended === true || extended?.mode) ? new Map() : null; // For mode
        let highestRep = 0;
        
        // Welford’s variables for online variance
        let mean = 0;
        let M2 = 0;
    
        let index = 0;
        for (let value of iterable) {
            if (!TypeCheck.isNumber(value)) {
                throw new Error(Errors.Messages.MUST_BE_NUMBER_all_sequence_elements);
            }
    
            if (index === 0) {
                result.minimum = value;
                result.maximum = value;
            } else {
                result.minimum = Math.min(result.minimum, value);
                result.maximum = Math.max(result.maximum, value);
            }
    
            result.summary += value;
    
            // Welford's algorithm for variance
            const delta = value - mean;
            mean += delta / (index + 1);
            M2 += delta * (value - mean);
    
            if (values /* for median */) {
                values.push(value);
            }

            if (freqMap /* for mode */) {
                let freq = freqMap.get(value) || 0;
                freq++;
                freqMap.set(value, freq);
                if(highestRep == 0 || freq > highestRep)
                    highestRep = freq;
            }
            index++;
        }
    
        result.count = index;
    
        if (result.count > 0) {
            result.average = result.summary / result.count;
            result.range = result.maximum - result.minimum;
    
             // Variance and standard deviation (always streamable)
            if (result.count > 1) {
                result.variance = M2 / result.count;
                result.standardDeviation = Math.sqrt(result.variance);
            } else {
                result.variance = 0;
                result.standardDeviation = 0;
            }

            if (values) {
                // Median
                values.sort((a, b) => a - b);
                const mid = Math.floor(values.length / 2);
                result.median = values.length % 2 !== 0
                    ? values[mid]
                    : (values[mid - 1] + values[mid]) / 2;
            }

            if(freqMap) {
                // Mode
                if(highestRep <= 1) {
                    result.mode = undefined; /* all items have the same repetition count or no items at all were in the sequence */ 
                }
                else {
                    const modeCandidates = [];
                    let totalUniqueValues = 0;
                    for (const [val, rep] of freqMap.entries()) {
                        totalUniqueValues++;
                        if (rep === highestRep) {
                            modeCandidates.push(val);
                        }
                    }

                    if (modeCandidates.length === totalUniqueValues) {
                        result.mode = undefined; // All items have same repetition
                    } else {
                        result.mode = modeCandidates.sort((a, b) => a - b);
                    }
                }
            }
        }
    
        return Linq.Statistics.fromJSON(result);
    }
    
    /**
     * Computes the sum of the sequence of numeric values. 
     * If at least one element of the sequence is not a number, the return value is undefined.
     * If the sequence is empty, the returned value is undefined.
     * @returns {number | undefined}
     */
    sum() { return Linq.#_sum(this.#_thisArg, this); }

    static #_sum(thisArg, iterable) {
        let sum = 0, result = undefined /* in case that the sequence is empty, the returned value is undefined */;

        for (let item of iterable) {
            if (TypeCheck.isNumber(item)) { result = sum += item; }
            else { return undefined; }
        }
        return result;
    }

    /**
     * Returns a specified number of contiguous elements from the start of this sequence.
     * @param {number} count - The number of elements to return.
     * @returns {Linq} A new sequence that contains the specified number of elements from the start of this sequence.
     * @throws `count` must be an integer
     */
    take(count) { return Linq.#_take(this.#_thisArg, this, count); }

    static #_take(thisArg, iterable, count) {
        if (!TypeCheck.isIntegral(count)) { throw new Error(Errors.Messages.MUST_BE_INTEGER_count); }
        return new this(this.#_takeGen(thisArg, iterable, count), thisArg);
    }

    static *#_takeGen(thisArg, iterable, count) {
        let index = 0;
        for (let item of iterable) {
            if (index++ < count) { yield item; }
            else { break; }
        }
    }

    /**
     * Returns a new sequence that contains the last count elements from this sequence.
     * @param {number} count - The number of last elements to return.
     * @returns {Linq} A new sequence that contains the specified number of last elements from this sequence.
     * @throws `count` must be an integer
     */
    takeLast(count) { return Linq.#_takeLast(this.#_thisArg, this, count); }

    static #_takeLast(thisArg, iterable, count) {
        if (!TypeCheck.isIntegral(count)) { throw new Error(Errors.Messages.MUST_BE_INTEGER_count); }
        return new this(this.#_takeLastGen(thisArg, iterable, count), thisArg);
    }

    static *#_takeLastGen(thisArg, iterable, count) {
        if (count > 0) {
            let all = Array.from(iterable);
            let start = Math.max(0, all.length - count);
            for (let i = start; i < all.length; i++) {
                yield all[i];
            }
        }
    }

    /**
     * Returns elements from this sequence as long as a specified condition is true, and then skips the remaining elements.
     * @param {Function} predicate - A function to test each source element for a condition; The first parameter is the element, the second parameter represents the index of the element within this sequence.
     * @returns {Linq} A new sequence that contains the elements from this sequence that occur before the element at which the test no longer passes.
     * @throws `predicate` must be a function
     */
    takeWhile(predicate) { return Linq.#_takeWhile(this.#_thisArg, this, predicate); }

    static #_takeWhile(thisArg, iterable, predicate) {
        if (!TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_predicate); }
        return new this(this.#_takeWhileGen(thisArg, iterable, predicate), thisArg);
    }

    static *#_takeWhileGen(thisArg, iterable, predicate) {
        let index = 0;
        thisArg = thisArg ?? this;
        for (let item of iterable) {
            if (predicate.call(thisArg, item, index) !== true) { break; }
            yield item;
            index++;
        }
    }

    /**
     * Creates an array from the currrent enumerable.
     * @returns {Array} An array that contains the elements from of the current sequence.
     */
    toArray() { return Linq.#_toArray(this.#_thisArg, this); }

    static #_toArray(thisArg, iterable) {
        let result = [];
        for (let item of iterable) { result.push(item); }
        return result;
    }

    /**
     * Creates a map from the current sequence according to a specified key selector function, and an element selector function.
     * @param {Function} [keySelector] An optional function to extract out of each element in th sequence the key for each corresponding element in the map.
     * The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence.
     * @param {Function} [valueSelector] An optional function to extract out of each element in th sequence the value for each corresponding element in the map.
     * The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence.
     * @returns {Map} A map from the current sequence according to a specified key selector function, and the value selector function.
     * @throws `keySelector` must be a function or nullish
     * @throws `valueSelector` must be a function or nullish
     * @throws `keySelector` produces duplicate keys
     */
    toMap(keySelector, valueSelector) { return Linq.#_toMapOrSet(this.#_thisArg, this, keySelector, valueSelector, false); }

    /**
     * Creates a map from the current sequence according to a specified key selector function, and an element selector function. 
     * This function is an alias to `toMap`.
     * @param {Function} [keySelector] An optional function to extract out of each element in th sequence the key for each corresponding element in the map.
     * The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence.
     * @param {Function} [valueSelector] An optional function to extract out of each element in th sequence the value for each corresponding element in the map.
     * The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence.
     * @returns {Map} A map from the current sequence according to a specified key selector function, and the value selector function.
     * @throws `keySelector` must be a function or nullish
     * @throws `valueSelector` must be a function or nullish
     * @throws `keySelector` produces duplicate keys
     */
    toDictionary(keySelector, valueSelector) { return Linq.#_toMapOrSet(this.#_thisArg, this, keySelector, valueSelector, false); }
    
    /**
     * Creates a set from the current sequence.
     * @param {Function} [keySelector] An optional function to extract out of each element in th sequence the key (which is also the value) for each corresponding element in the set.
     * The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence.
     * @returns {Set} A set from the current sequence according to a specified key selector.
     * @throws `keySelector` must be a function or nullish
     * @throws `keySelector` produces duplicate keys
     */
    toSet(keySelector) { return Linq.#_toMapOrSet(this.#_thisArg, this, keySelector, null, true); }

    // eslint-disable-next-line no-unused-vars
    static #_toMapOrSet(thisArg, iterable, keySelector, valueSelector, set, weak) {
        if (keySelector != null && !TypeCheck.isFunction(keySelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_keySelector); }
        if (valueSelector != null && !TypeCheck.isFunction(valueSelector)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_OR_NULLISH_valueSelector); }

        /*
            * This implementation does not contain key comparer because Javascript map does not support key comparer for Map, and so is for Set.
            * Implementing such will not benefit high performance, because of the lack of GetHashCode native support.
            */
        keySelector = keySelector ?? this.#_defaultSelector;
        valueSelector = valueSelector ?? this.#_defaultSelector;

        let result = set === true ? new Set() : new Map();
        let index = 0;
        thisArg = thisArg ?? this;
        for (let item of iterable) {
            let key = keySelector.call(thisArg, item, index);
            if (result.has(key)) {
                throw new Error(Errors.Messages.PRODUCES_DUPLICATE_KEYS_keySelector);
            }

            if (set === true) { result.add(key); }
            else {
                result.set(key, valueSelector.call(thisArg, item, index));
            }
            index++;
        }
        return result;
    }

    /**
     * Filters the sequence of values based on a predicate.
     * @param {Function} predicate - A function to test each source element for a condition; The first parameter to this test function is a source element, the second parameter of the function represents the index of the source element.
     * @returns {Linq} An enumerable that contains elements from the sequence that satisfy the condition.
     * @throws `predicate` must be a function
     */
    where(predicate) { return Linq.#_where(this.#_thisArg, this, predicate); }

    static #_where(thisArg, iterable, predicate) {
        if (!TypeCheck.isFunction(predicate)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_predicate); }
        return new this(this.#_whereGen(thisArg, iterable, predicate), thisArg);
    }

    static *#_whereGen(thisArg, iterable, predicate) {
        let index = 0;
        thisArg = thisArg ?? this;
        for (let item of iterable) {
            if (predicate.call(thisArg, item, index) === true) { yield item; }
            index++;
        }
    }

    /**
     * Produces a set union of the current sequence with the specified sequences. 
     * The sequence contains only the UNIQUE items.
     * @param {Iterable} secondIterable - The second sequence.
     * @param {Function} [equalityComparer] - An equality comparer to be used to compare two items.
     * @returns {Linq} A set union of the current sequence with the specified sequences.
     * @throws `secondIterable` must be iterable
     * @throws `equalityComparer` must be a function or nullish
     */
    union(secondIterable, equalityComparer) { return Linq.#_van(this.#_thisArg, this, secondIterable, equalityComparer, "union"); }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. The iteration stops when right after the last item of one of the sequences has reached.
     * @param {Iterable} iterable1 - The first sequence
     * @param {Iterable} iterable2 - The second sequence.
     * @param {Function} transform - The transform function. The first parameter is the item from the first sequence, The second parameter is the item from the second sequence. The third parameter is the index of these items within the sequences.
     * @param {any} thisArg - Th object that will be used as this pointer in the transform function.
     * @returns {Linq} A result sequence.
     * @throws `iterable1` must be iterable
     * @throws `iterable2` must be iterable
     * @throws `transform` must be a function
     */
    static zip(iterable1, iterable2, transform, thisArg) {
        if (!TypeCheck.isIterable(iterable1)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_iterable1); }
        if (!TypeCheck.isIterable(iterable2)) { throw new Error(Errors.Messages.MUST_BE_ITERABLE_iterable2); }
        if (!TypeCheck.isFunction(transform)) { throw new Error(Errors.Messages.MUST_BE_FUNCTION_transform); }

        return new this(this.#_zip(thisArg, iterable1, iterable2, transform), thisArg);
    }

    static *#_zip(thisArg, iterable1, iterable2, transform) {
        let g1 = this.#_createSimpleGenerator(iterable1);
        let g2 = this.#_createSimpleGenerator(iterable2);
        let item1, item2, index = 0;

        thisArg = thisArg ?? this;
        item1 = g1.next();
        item2 = g2.next();
        while (!item1.done && !item2.done) {
            yield transform.call(thisArg, item1.value, item2.value, index);
            item1 = g1.next();
            item2 = g2.next();
            index++;
        }

        /* closes the generators */
        g1.return();
        g2.return();
    }
}

Linq.Statistics = Statistics;

export default Linq;

export {
    Linq
};