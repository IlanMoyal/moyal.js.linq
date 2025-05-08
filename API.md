## Classes

<dl>
<dt><a href="#Linq">Linq</a></dt>
<dd><p>Linq - A static entry point for LINQ-style operations on arrays.</p>
<p>Provides methods to initiate query chains, enabling advanced data transformations
such as filtering, mapping, grouping, ordering, and aggregating using a fluent syntax.</p>
<p>All operations are performed on native JavaScript arrays, with no external dependencies.</p>
<p>Example usage:</p>
<pre><code class="language-js">const query = Linq.from([1, 2, 3, 4])
    .where(x =&gt; x &gt; 2)
    .select(x =&gt; x * 10)
    .toArray();  // [30, 40]
</code></pre>
<p>or</p>
<pre><code class="language-js">const query = new Linq([1, 2, 3, 4])
    .where(x =&gt; x &gt; 2)
    .select(x =&gt; x * 10)
    .toArray();  // [30, 40]
</code></pre>
</dd>
<dt><a href="#LinqGroup">LinqGroup</a></dt>
<dd><p>Represents a group of elements sharing a common key,
typically used in LINQ operations like <code>groupBy</code> or <code>groupJoin</code>.
This class is iterable and inherits all LINQ capabilities.</p>
</dd>
<dt><a href="#LinqOrder">LinqOrder</a></dt>
<dd><p>Represents a LINQ-ordered iterable, allowing chained sorting with <code>thenBy</code> and <code>thenByDescending</code>.</p>
</dd>
<dt><a href="#Statistics">Statistics</a></dt>
<dd><p>Represents statistical measurements for a numeric sequence.</p>
<p>Provides access to summary statistics (count, min, max, average, range, sum, variance, standard deviation) 
and, optionally, extended calculations (mode, median) if computed during construction.</p>
<p>Use <code>clone()</code> to create a duplicate of an instance, and <code>toJSON()</code> to serialize it.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#NumericValue">NumericValue</a> : <code>number</code> | <code>bigint</code></dt>
<dd><p>A numeric value (number or bigint).</p>
</dd>
</dl>

<a name="Linq"></a>

## Linq
Linq - A static entry point for LINQ-style operations on arrays.Provides methods to initiate query chains, enabling advanced data transformationssuch as filtering, mapping, grouping, ordering, and aggregating using a fluent syntax.All operations are performed on native JavaScript arrays, with no external dependencies.Example usage:```jsconst query = Linq.from([1, 2, 3, 4])    .where(x => x > 2)    .select(x => x * 10)    .toArray();  // [30, 40]```or```jsconst query = new Linq([1, 2, 3, 4])    .where(x => x > 2)    .select(x => x * 10)    .toArray();  // [30, 40]```

**Kind**: global class  

* [Linq](#Linq)
    * [new Linq(iterable, thisArg)](#new_Linq_new)
    * _instance_
        * [.aggregate(seed, accumulator, [resultSelector])](#Linq+aggregate) ⇒ <code>any</code>
        * [.all(predicate)](#Linq+all) ⇒ <code>boolean</code>
        * [.any([predicate])](#Linq+any) ⇒ <code>boolean</code>
        * [.append(value)](#Linq+append) ⇒ [<code>Linq</code>](#Linq)
        * [.average()](#Linq+average) ⇒ <code>number</code> \| <code>undefined</code>
        * [.concat(...withIterables)](#Linq+concat) ⇒ [<code>Linq</code>](#Linq)
        * [.contains(value, [equalityComparer])](#Linq+contains) ⇒ <code>boolean</code>
        * [.count()](#Linq+count) ⇒ <code>number</code>
        * [.defaultIfEmpty(defaultSingletonValue)](#Linq+defaultIfEmpty) ⇒ <code>Iterable</code>
        * [.distinct([equalityComparer])](#Linq+distinct) ⇒ [<code>Linq</code>](#Linq)
        * [.duplicate(factor, [inplace])](#Linq+duplicate) ⇒ [<code>Linq</code>](#Linq)
        * [.elementAt(index)](#Linq+elementAt) ⇒ <code>any</code>
        * [.elementAtOrDefault(index, defaultValue)](#Linq+elementAtOrDefault) ⇒ <code>any</code>
        * [.except(secondIterable, [equalityComparer])](#Linq+except) ⇒ [<code>Linq</code>](#Linq)
        * [.first([predicate])](#Linq+first) ⇒ <code>any</code>
        * [.firstOrDefault(defaultValue, [predicate])](#Linq+firstOrDefault) ⇒ <code>any</code>
        * [.forEach(callback)](#Linq+forEach)
        * [.groupBy(keySelector, [elementSelector], [resultSelector], [keyEqualityComparer])](#Linq+groupBy)
        * [.groupJoin(rightIterable, [leftKeySelector], [rightKeySelector], [resultSelector], [keyEqualityComparer])](#Linq+groupJoin) ⇒ [<code>Linq</code>](#Linq)
        * [.intersect(secondIterable, [equalityComparer])](#Linq+intersect) ⇒ [<code>Linq</code>](#Linq)
        * [.join(rightIterable, [leftKeySelector], [rightKeySelector], [resultSelector], [keyEqualityComparer])](#Linq+join) ⇒ [<code>Linq</code>](#Linq)
        * [.last([predicate])](#Linq+last) ⇒ <code>any</code>
        * [.lastOrDefault(defaultValue, [predicate])](#Linq+lastOrDefault) ⇒ <code>any</code>
        * [.max([comparer])](#Linq+max) ⇒ <code>any</code>
        * [.min([comparer])](#Linq+min) ⇒ <code>any</code>
        * [.orderBy([keySelector], [comparer])](#Linq+orderBy) ⇒ [<code>Linq</code>](#Linq)
        * [.orderByDescending([keySelector], [comparer])](#Linq+orderByDescending) ⇒ [<code>Linq</code>](#Linq)
        * [.prepend(value)](#Linq+prepend) ⇒ [<code>Linq</code>](#Linq)
        * [.removeNullishes()](#Linq+removeNullishes) ⇒ [<code>Linq</code>](#Linq)
        * [.reverse()](#Linq+reverse) ⇒ <code>\_sel.Linq</code>
        * [.select([selector])](#Linq+select) ⇒ <code>\_self.Linq</code>
        * [.selectMany([collectionSelector], [resultSelector])](#Linq+selectMany) ⇒ [<code>Linq</code>](#Linq)
        * [.sequenceEqual(secondIterable, [equalityComparer])](#Linq+sequenceEqual) ⇒ <code>boolean</code>
        * [.single([predicate])](#Linq+single) ⇒ <code>any</code>
        * [.singleOrDefault(defaultValue, [predicate])](#Linq+singleOrDefault) ⇒ <code>any</code>
        * [.skip(count)](#Linq+skip) ⇒ [<code>Linq</code>](#Linq)
        * [.skipLast(count)](#Linq+skipLast) ⇒ [<code>Linq</code>](#Linq)
        * [.skipWhile(predicate)](#Linq+skipWhile) ⇒ [<code>Linq</code>](#Linq)
        * [.statistics(extended)](#Linq+statistics) ⇒ <code>Linq.Statistics</code>
        * [.sum()](#Linq+sum) ⇒ <code>number</code> \| <code>undefined</code>
        * [.take(count)](#Linq+take) ⇒ [<code>Linq</code>](#Linq)
        * [.takeLast(count)](#Linq+takeLast) ⇒ [<code>Linq</code>](#Linq)
        * [.takeWhile(predicate)](#Linq+takeWhile) ⇒ [<code>Linq</code>](#Linq)
        * [.toArray()](#Linq+toArray) ⇒ <code>Array</code>
        * [.toMap([keySelector], [valueSelector])](#Linq+toMap) ⇒ <code>Map</code>
        * [.toDictionary([keySelector], [valueSelector])](#Linq+toDictionary) ⇒ <code>Map</code>
        * [.toSet([keySelector])](#Linq+toSet) ⇒ <code>Set</code>
        * [.where(predicate)](#Linq+where) ⇒ [<code>Linq</code>](#Linq)
        * [.union(secondIterable, [equalityComparer])](#Linq+union) ⇒ [<code>Linq</code>](#Linq)
    * _static_
        * [.Version](#Linq.Version) ⇒ <code>string</code>
        * [.from(iterable, [thisArg])](#Linq.from) ⇒ [<code>Linq</code>](#Linq)
        * [.empty(thisArg)](#Linq.empty) ⇒ [<code>Linq</code>](#Linq)
        * [.range(start, count, [thisArg])](#Linq.range) ⇒ [<code>Linq</code>](#Linq)
        * [.repeat(value, count, [thisArg])](#Linq.repeat) ⇒ [<code>Linq</code>](#Linq)
        * [.zip(iterable1, iterable2, transform, thisArg)](#Linq.zip) ⇒ [<code>Linq</code>](#Linq)

<a name="new_Linq_new"></a>

### new Linq(iterable, thisArg)
Initialize a new instance of Linq object and wrap the specified iterable within it.

**Throws**:

- <code>Error</code> `iterable` argument must be iterable


| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable.&lt;any&gt;</code> | An iterable object (e.g. Array, string, Map, Set...) |
| thisArg | <code>any</code> | A "this" pointer to be applied when calling user's callbacks. |

<a name="Linq+aggregate"></a>

### linq.aggregate(seed, accumulator, [resultSelector]) ⇒ <code>any</code>
Applies an accumulator function over the sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The transformed final accumulator value.  
**Throws**:

- `accumulator` must be a function
- `resultSelector` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| seed | <code>any</code> | The initial accumulator value. The first parameter is the current sequence item. The second parameter is the value accumulated so far. The third parameter is the index of the current item (the first parameter) in the sequence. |
| accumulator | <code>function</code> | An accumulator function to be invoked on each element. |
| [resultSelector] | <code>function</code> | An optional function to transform the final accumulator value into the result value. |

<a name="Linq+all"></a>

### linq.all(predicate) ⇒ <code>boolean</code>
Determines whether all elements of the sequence satisfy a condition.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>boolean</code> - true if every element of the sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.  
**Throws**:

- `predicate` must be a function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test each source element for a condition; The first parameter is a source element, the second parameter represents the index of the source element in the sequence. |

<a name="Linq+any"></a>

### linq.any([predicate]) ⇒ <code>boolean</code>
Determines whether any element of the sequence exists or satisfies a condition.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>boolean</code> - true if the sequence contains any elements; otherwise, false. BUT In case that a predicate was specified: true if the sequence is not empty and at least one of its elements passes the test in the specified predicate; otherwise, false.  
**Throws**:

- `predicate` must be a function or nullish.


| Param | Type | Description |
| --- | --- | --- |
| [predicate] | <code>function</code> | A function to test each source element for a condition; The first parameter is a source element, the second parameter represents the index of the source element in the sequence. |

<a name="Linq+append"></a>

### linq.append(value) ⇒ [<code>Linq</code>](#Linq)
Appends a value to the end of the sequence. The original sequence (the current) is not changed.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence consist of the current sequence plus the specified value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to be appended to the returned sequence. |

<a name="Linq+average"></a>

### linq.average() ⇒ <code>number</code> \| <code>undefined</code>
Computes the average of the sequence of numeric values. If the sequence is empty or at least one element of the sequence is not a number, the return value is undefined.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>number</code> \| <code>undefined</code> - The numeric average of the sequence,or undefined if the sequence contains at least oneitem that is not a number.  
<a name="Linq+concat"></a>

### linq.concat(...withIterables) ⇒ [<code>Linq</code>](#Linq)
Concatenates the current sequence with the specified sequences. Note that the current sequence is not modified.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - An iterable that contains the concatenated elements of the current sequence with all input sequences.  
**Throw**: At least one of the argument is not iterable.  

| Param | Type | Description |
| --- | --- | --- |
| ...withIterables | <code>Iterable</code> | Iterable sequences  be appended to the endof this sequence to form a single sequence. |

<a name="Linq+contains"></a>

### linq.contains(value, [equalityComparer]) ⇒ <code>boolean</code>
Determines whether the sequence contains the specified element using strict equality comparison (===) or the specified equality comparer.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>boolean</code> - true if the sequence contains the specified value using strict equality comparison (===) or the specified equality comparer; otherwise, false.  
**Throws**:

- `equalityComparer` must be a function or nullish.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value to locate in the sequence. |
| [equalityComparer] | <code>function</code> | <code></code> | An optional equality comparer to compare values. The first parameter to the comparer is the specified value. The second parameter is an item from the sequence. The third parameter is the index of the item in the sequence. |

<a name="Linq+count"></a>

### linq.count() ⇒ <code>number</code>
Returns the number of elements in a sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>number</code> - The number of elements in a sequence.  
<a name="Linq+defaultIfEmpty"></a>

### linq.defaultIfEmpty(defaultSingletonValue) ⇒ <code>Iterable</code>
Returns the elements of the sequence, or a default valued singleton collection if the sequence is empty.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Iterable</code> - The elements of the sequence, or a default valued singleton collection if the sequence is empty.  

| Param | Type | Description |
| --- | --- | --- |
| defaultSingletonValue | <code>any</code> | A default value to be used as a singleton in the returned sequence if the current sequence is empty. |

<a name="Linq+distinct"></a>

### linq.distinct([equalityComparer]) ⇒ [<code>Linq</code>](#Linq)
Returns distinct elements from the sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - Distinct elements from a sequence.  
**Throws**:

- `equalityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [equalityComparer] | <code>function</code> | An equality comparer to compare values. |

<a name="Linq+duplicate"></a>

### linq.duplicate(factor, [inplace]) ⇒ [<code>Linq</code>](#Linq)
Duplicate the sequence number of times as specified `factor` parameter. If the factor is non integral number, the integer value less than or equal to the factor is used.If factor is less than 1, an empty sequence returns. This function does not modify the current sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence consist of duplication of the current sequence.  
**Throws**:

- `factor` must be a non negative integer


| Param | Type | Description |
| --- | --- | --- |
| factor | <code>number</code> | The number of times to duplicate the |
| [inplace] | <code>boolean</code> | If set to true, duplicate each element and places the duplication right after this element, instead of duplicating the whole sequence and return them one after the other. The default is false. |

<a name="Linq+elementAt"></a>

### linq.elementAt(index) ⇒ <code>any</code>
Returns the element at a specified index in the sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The element at a specified index in a sequence.  
**Throws**:

- `index` must be a non negative integer
- The sequence is empty
- `index` is out of range


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The zero-based index of the element to retrieve. |

<a name="Linq+elementAtOrDefault"></a>

### linq.elementAtOrDefault(index, defaultValue) ⇒ <code>any</code>
Returns the element at a specified index in the sequence, or the specified default value if the specified index is negative or out of range.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The element at a specified index in the sequence, or the default value if the specified index is negative or out of range.  
**Throws**:

- `index` must be a non negative integer


| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The zero-based index of the element to retrieve. |
| defaultValue | <code>any</code> | The default value to be returned. |

<a name="Linq+except"></a>

### linq.except(secondIterable, [equalityComparer]) ⇒ [<code>Linq</code>](#Linq)
Produces a set of unique items from the current sequence that do not appear in the specified scond sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A set of unique items from the current sequence that do not appear in the specified scond sequence.  
**Throws**:

- `secondIterable` must be iterable
- `equalityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| secondIterable | <code>Iterable</code> | The second sequence. |
| [equalityComparer] | <code>function</code> | An equality comparer to be used to compare two items. |

<a name="Linq+first"></a>

### linq.first([predicate]) ⇒ <code>any</code>
Returns the first element in the sequence, or the first element in the sequence that meets the specified condition, if such one was specified.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The first element in the sequence, or the first element in the sequence that satisfies a specified condition, if such one was specified.  
**Throws**:

- `predicate` must be a function, null or undefined.
- The sequence is empty.
- No element satisfies the condition in predicate.


| Param | Type | Description |
| --- | --- | --- |
| [predicate] | <code>function</code> | An optional function to test each element of the sequence for a condition; The first parameter is a source element, the second parameter is the index of the source element within the sequence. |

<a name="Linq+firstOrDefault"></a>

### linq.firstOrDefault(defaultValue, [predicate]) ⇒ <code>any</code>
Returns the first element of the sequence, or the first one that meets the specified condition, if such one was specified. A default value is returned if the sequence is empty or no element was found.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The first element of the sequence, or the first one that meets the specified condition, if such one was specified. Or the specified default value if the sequence is empty or no element was found.  
**Throws**:

- `predicate` must be a function, null or undefined.


| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>any</code> | The default value to return in case that sequence is empty, or none of the sequence items meets the specified condition. |
| [predicate] | <code>function</code> | A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+forEach"></a>

### linq.forEach(callback)
Iterates through all elements in the sequence, and call the specified function for each.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Throws**:

- `callback` must be a function


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback function to be called for each element of the sequence until all elements of the sequence processed,  or until a boolean false value was returned by the function;  The first parameter to the callback is an element of the sequence, the second parameter represents the index of the element within the sequence. The callback might return false to stop the iteration. |

<a name="Linq+groupBy"></a>

### linq.groupBy(keySelector, [elementSelector], [resultSelector], [keyEqualityComparer])
**Kind**: instance method of [<code>Linq</code>](#Linq)  

| Param | Type | Description |
| --- | --- | --- |
| keySelector | <code>any</code> | key creator |
| [elementSelector] | <code>any</code> | source element to group element: groupElementType func (sourceElementType) |
| [resultSelector] | <code>any</code> | resultType func(key, groupElementType) |
| [keyEqualityComparer] | <code>any</code> | bool (a, b) |

<a name="Linq+groupJoin"></a>

### linq.groupJoin(rightIterable, [leftKeySelector], [rightKeySelector], [resultSelector], [keyEqualityComparer]) ⇒ [<code>Linq</code>](#Linq)
Correlates the elements of two sequences based on matching keys: this sequence (which considered to be the left one) and the specified sequence (the right). The result sequence contains each and every element from the left sequence along with its matched-key elements, group together, from the right.The order of the result sequence keeps the order of the left sequence (this sequence), and for each match from the right sequence the order is also maintained.It is possible to control the returned object by specifying a result selector which accepts the element from the left (this sequence) and its matched element from the right grouped as a single Linq object.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - An iterable object that has elements that are obtained by performing an group join on the two sequences.  
**Throws**:

- `rightIterable` must be iterable.
- `leftKeySelector` must be a function or nullish.
- `rightKeySelector` must be a function or nullish
- `resultSelector` must be a function or nullish
- `keyEqualityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| rightIterable | <code>Iterable</code> | The right side sequence to group-join to the left sequence (this one). |
| [leftKeySelector] | <code>function</code> | An optional function to extract the join key from each element of the left sequence (this one). By default the element itself is used as both key and value. |
| [rightKeySelector] | <code>function</code> | An optional function to extract the join key from each element of the right sequence. By default the element itself is used as both key and value. |
| [resultSelector] | <code>function</code> | An optional function to create a result element from matching elements, a single element from the left (this sequence) and a group of elements from the right (the specified sequence). By default, the result element is an array of these two. |
| [keyEqualityComparer] | <code>function</code> | An optional function to check the equality of two keys. By default a strict comparison is made (===). |

<a name="Linq+intersect"></a>

### linq.intersect(secondIterable, [equalityComparer]) ⇒ [<code>Linq</code>](#Linq)
Produces a sequence of UNIQUE items that appear in this sequence as well as the specified sequence. The order of the items remains the same as it was in this sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence of UNIQUE items that ALSO appear in the specified sequence. The order of the items remains the same as it was in this sequence.  
**Throws**:

- `secondIterable` must be iterable
- `equalityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| secondIterable | <code>Iterable</code> | The second sequence. |
| [equalityComparer] | <code>function</code> | An equality comparer to be used to compare two items. |

<a name="Linq+join"></a>

### linq.join(rightIterable, [leftKeySelector], [rightKeySelector], [resultSelector], [keyEqualityComparer]) ⇒ [<code>Linq</code>](#Linq)
Correlates the elements of two sequences based on matching keys: this sequence (which considered to be the left one) and the specified sequence (the right). The result sequence contains each element from the left sequence along with its matched-key element from the right - and only these.The order of the result sequence keeps the order of the left sequence (this sequence), and for each match from the right sequence the order is also maintained.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - An iterable object that has elements that are obtained by performing an inner join on the two sequences.  
**Throws**:

- `rightIterable` must be iterable.
- `leftKeySelector` must be a function or nullish.
- `rightKeySelector` must be a function or nullish
- `resultSelector` must be a function or nullish
- `keyEqualityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| rightIterable | <code>Iterable</code> | The right side sequence to join to the left sequence (this one). |
| [leftKeySelector] | <code>function</code> | An optional function to extract the join key from each element of the left sequence (this one). By default the element itself is used as both key and value. |
| [rightKeySelector] | <code>function</code> | An optional function to extract the join key from each element of the right sequence. By default the element itself is used as both key and value. |
| [resultSelector] | <code>function</code> | An optional function to create a result element from two matching elements. By default, the result element is an array of the two matched elements. |
| [keyEqualityComparer] | <code>function</code> | An optional function to check the equality of two keys. By default a strict comparison is made (===). |

<a name="Linq+last"></a>

### linq.last([predicate]) ⇒ <code>any</code>
Returns the last element in a sequence, or the last element in the sequence that meets the specified condition, if specified.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The last element in the specified sequence, or the last element in the sequence that satisfies a specified condition, if specified.  
**Throws**:

- `predicate` must be a function or nullish
- The sequence is empty
- No element satisfies the condition in predicate


| Param | Type | Description |
| --- | --- | --- |
| [predicate] | <code>function</code> | A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+lastOrDefault"></a>

### linq.lastOrDefault(defaultValue, [predicate]) ⇒ <code>any</code>
Returns the last element of the sequence, or the last one that meets the specified condition, if such one was specified. A default value is returned if the sequence is empty or no element was found.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The last element of the sequence, or the last one that meets the specified condition, if such one was specified. Or the specified default value if the sequence is empty or no element was found.  
**Throws**:

- `predicate` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>any</code> | The default value to return in case that sequence is empty, or none of the sequence items meets the specified condition. |
| [predicate] | <code>function</code> | A function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+max"></a>

### linq.max([comparer]) ⇒ <code>any</code>
Returns the maximum value in the sequence. If the sequence is empty, the return value is undefined. If it contains a single value, it will be the maximum value, no matter what it is.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The maximum value of the sequence.  
**Throws**:

- `compare` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>function</code> | An optional function to compare two items from the sequence. The first parameter to this function is the first item, the second parameter is the second item, and the third parameter is the index of the SECOND item in the sequence. If no compare function is passed, a default compare is used (>= operator). In this default compare, if one of the arguments is null or undefined, the result is undefined. |

<a name="Linq+min"></a>

### linq.min([comparer]) ⇒ <code>any</code>
Returns the minimum value in the sequence. If the sequence is empty, the return value is undefined. If it contains a single value, it will be the minimum value, no matter what it is.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The minimum value of the sequence.  
**Throws**:

- `compare` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [comparer] | <code>function</code> | An optional function to compare two items from the sequence. The first parameter to this function is the first item, the second parameter is the second item, and the third parameter is the index of the SECOND item in the sequence. If no compare function is passed, a default compare is used (>= operator). In this default compare, if one of the arguments is null or undefined, the result is undefined. |

<a name="Linq+orderBy"></a>

### linq.orderBy([keySelector], [comparer]) ⇒ [<code>Linq</code>](#Linq)
Sorts the elements of the sequence in ascending order, optionally by using the specified keySelector and comparer.This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - The elements of the sequence in ascending order, optionally by using the specified keySelector and comparer.  
**Throws**:

- `keySelector` must be a function or nullish
- `comparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract a key from an element. My default the element is used as the key. |
| [comparer] | <code>function</code> | An optional comparer to compare keys. By default a simple comparison is made. |

<a name="Linq+orderByDescending"></a>

### linq.orderByDescending([keySelector], [comparer]) ⇒ [<code>Linq</code>](#Linq)
Sorts the elements of the sequence in descending order, optionally by using the specified keySelector and comparer.This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - The elements of the sequence in descending order, optionally by using the specified keySelector and comparer.  
**Throws**:

- `keySelector` must be a function or nullish
- `comparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract a key from an element. Ny default the element is used as the key. |
| [comparer] | <code>function</code> | An optional comparer to compare keys. By default a simple comparison is made. |

<a name="Linq+prepend"></a>

### linq.prepend(value) ⇒ [<code>Linq</code>](#Linq)
Adds a value to the beginning of the sequence. The original sequence (the current) is not changed.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence consist of the specified element, and then the items from the current sequence.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to be added to the beginning of the returned sequence. |

<a name="Linq+removeNullishes"></a>

### linq.removeNullishes() ⇒ [<code>Linq</code>](#Linq)
Return a copy of this sequence without the nullish values (null or undefined).

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A copy of this sequence without the nullish values (null or undefined).  
<a name="Linq+reverse"></a>

### linq.reverse() ⇒ <code>\_sel.Linq</code>
Inverts the order of the elements in a sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>\_sel.Linq</code> - A copy of this sequence in reserve order.  
<a name="Linq+select"></a>

### linq.select([selector]) ⇒ <code>\_self.Linq</code>
Projects each element of this sequence into a new form.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>\_self.Linq</code> - A new sequence whose elements are the result of invoking the transform function on each element this sequence.  
**Throws**:

- `selector` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [selector] | <code>function</code> | A n optional transform function to apply to each source element; The first parameter is the element, the second parameter represents the index of the source element. The default selector simply return the item that passed as parameter. |

<a name="Linq+selectMany"></a>

### linq.selectMany([collectionSelector], [resultSelector]) ⇒ [<code>Linq</code>](#Linq)
Projects each element as inner sequence, then flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence whose elements are the result of invoking the transform functions on each inner sequence and on each element of each inner sequence.  
**Throws**:

- `collectionSelector` must be a function or nullish
- `resultSelector` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [collectionSelector] | <code>function</code> | A transform function to apply to each source element and SHOULD return an iterable object (the inner sequence). In this function: The first parameter is the source element from this sequence.  The second parameter represents the index of the source element within this sequence.  The default selector simply returns the source element that passed as the first parameter. |
| [resultSelector] | <code>function</code> | A transform function to apply to each item of each inner sequence. In this function: The first parameter is a item itself.  The second parameter represents the index of this item within the inner sequence which is currently scanned.  The third parameter is a reference to the inner sequence which is currently scanned.  The forth parameter represents the index of the this inner sequence within the current sequence.*  By default the selector simply returns the item that passed as parameter. |

<a name="Linq+sequenceEqual"></a>

### linq.sequenceEqual(secondIterable, [equalityComparer]) ⇒ <code>boolean</code>
Determines whether the current sequence is equal to the specified, according to an equality comparer.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>boolean</code> - true if the two sequences are of equal length and their corresponding elements are equal according to the equality comparer; otherwise, false.  
**Throws**:

- `secondIterable` must be iterable
- `equalityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| secondIterable | <code>Iterable</code> | The second sequence to compare to. |
| [equalityComparer] | <code>function</code> | An equality comparer to compare two items. The first parameter is the first item, the second parameter is the second item, and the third is the index of these items within the sequences. |

<a name="Linq+single"></a>

### linq.single([predicate]) ⇒ <code>any</code>
Returns the only element of the sequence, and throws an exception if there is not exactly one element in the sequence.ORReturns the only element of the sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The single element of the input sequence OR The single element of the input sequence that satisfies the specified predicate.  
**Throws**:

- `predicate` must be a function or nullish
- The input sequence contains more than one element
- More than one element satisfies the condition in predicate
- The sequence is empty
- No element satisfies the condition in predicate


| Param | Type | Description |
| --- | --- | --- |
| [predicate] | <code>function</code> | An optional function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+singleOrDefault"></a>

### linq.singleOrDefault(defaultValue, [predicate]) ⇒ <code>any</code>
Returns the only element of the sequence. If there is no element in the sequence, the specified defaultValue is returned. If the sequence contains more that a single element, an error is thrown.ORReturns the only element of the sequence, using the specified predicate to match the value. If no element matched, the specified defaultValue is returned. If more than a single element matched, an error is thrown.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>any</code> - The single element of the input sequence OR The single element of the input sequence that satisfies the specified predicate, or the defaultValue.  
**Throws**:

- predicate must be a function or nullish
- The input sequence contains more than one element
- More than one element satisfies the condition in predicate


| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>any</code> | The defaultValue. |
| [predicate] | <code>function</code> | An optional function to test each source element for a condition; The first parameter is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+skip"></a>

### linq.skip(count) ⇒ [<code>Linq</code>](#Linq)
Bypasses a specified number of elements in the sequence and then returns the remaining elements.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the elements that occur after the specified index in the sequence.  
**Throws**:

- `count` must be an integer


| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of elements to skip before returning the remaining elements. |

<a name="Linq+skipLast"></a>

### linq.skipLast(count) ⇒ [<code>Linq</code>](#Linq)
Returns a new sequence that contains the elements from the current sequence with the last count elements omitted.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the elements from the current sequence with the last count elements omitted.  
**Throws**:

- `count` must be an integer


| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Number of element from the end of this sequence to omit. |

<a name="Linq+skipWhile"></a>

### linq.skipWhile(predicate) ⇒ [<code>Linq</code>](#Linq)
Bypasses elements in the sequence as long as a specified condition is true and then returns the remaining elements.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the elements from the sequence starting at the first element in the sequence that does not pass the test specified by predicate.  
**Throws**:

- `predicate` must be a function


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test each source element for a condition; The first parameter to this predicate is the source element, the second parameter represents the index of the source element. |

<a name="Linq+statistics"></a>

### linq.statistics(extended) ⇒ <code>Linq.Statistics</code>
Calculates the following statistic measurements for the sequence of numbers: - count: The count numbers.- minimum: The minimal number in the sequence.- maximum: The maximal number in the sequence.- range: The range of the sequence, that is the difference between the maximal value and the minimal value.- average: The average number of the sequence.- summary: The summary of the sequence.- variance: The variance of the sequence- standard deviation: The standard deviation of the sequence (which is a square root of the variance).If extended was set to true, or more specifically extended.median and/or extended.mode were set to true.- mode: The value that appears most frequently in the sequence. If more than a single value have the same maximum repetition count, an array of all "modes" returns. If all items have the same repetition count, `undefined` is returned.- median: A numeric value that "splits" the sequence to two, so half of the elements comes before it, and half of the elements comes after it.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Linq.Statistics</code> - - The statistics result.  

| Param | Type | Description |
| --- | --- | --- |
| extended | <code>boolean</code> \| <code>Object</code> | Determines whether to calculates extended (additional) statistic values: mode, median, variance, standard. |

<a name="Linq+sum"></a>

### linq.sum() ⇒ <code>number</code> \| <code>undefined</code>
Computes the sum of the sequence of numeric values. If at least one element of the sequence is not a number, the return value is undefined.If the sequence is empty, the returned value is undefined.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
<a name="Linq+take"></a>

### linq.take(count) ⇒ [<code>Linq</code>](#Linq)
Returns a specified number of contiguous elements from the start of this sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the specified number of elements from the start of this sequence.  
**Throws**:

- `count` must be an integer


| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of elements to return. |

<a name="Linq+takeLast"></a>

### linq.takeLast(count) ⇒ [<code>Linq</code>](#Linq)
Returns a new sequence that contains the last count elements from this sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the specified number of last elements from this sequence.  
**Throws**:

- `count` must be an integer


| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of last elements to return. |

<a name="Linq+takeWhile"></a>

### linq.takeWhile(predicate) ⇒ [<code>Linq</code>](#Linq)
Returns elements from this sequence as long as a specified condition is true, and then skips the remaining elements.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A new sequence that contains the elements from this sequence that occur before the element at which the test no longer passes.  
**Throws**:

- `predicate` must be a function


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test each source element for a condition; The first parameter is the element, the second parameter represents the index of the element within this sequence. |

<a name="Linq+toArray"></a>

### linq.toArray() ⇒ <code>Array</code>
Creates an array from the currrent enumerable.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Array</code> - An array that contains the elements from of the current sequence.  
<a name="Linq+toMap"></a>

### linq.toMap([keySelector], [valueSelector]) ⇒ <code>Map</code>
Creates a map from the current sequence according to a specified key selector function, and an element selector function.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Map</code> - A map from the current sequence according to a specified key selector function, and the value selector function.  
**Throws**:

- `keySelector` must be a function or nullish
- `valueSelector` must be a function or nullish
- `keySelector` produces duplicate keys


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract out of each element in th sequence the key for each corresponding element in the map. The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence. |
| [valueSelector] | <code>function</code> | An optional function to extract out of each element in th sequence the value for each corresponding element in the map. The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence. |

<a name="Linq+toDictionary"></a>

### linq.toDictionary([keySelector], [valueSelector]) ⇒ <code>Map</code>
Creates a map from the current sequence according to a specified key selector function, and an element selector function. This function is an alias to `toMap`.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Map</code> - A map from the current sequence according to a specified key selector function, and the value selector function.  
**Throws**:

- `keySelector` must be a function or nullish
- `valueSelector` must be a function or nullish
- `keySelector` produces duplicate keys


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract out of each element in th sequence the key for each corresponding element in the map. The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence. |
| [valueSelector] | <code>function</code> | An optional function to extract out of each element in th sequence the value for each corresponding element in the map. The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence. |

<a name="Linq+toSet"></a>

### linq.toSet([keySelector]) ⇒ <code>Set</code>
Creates a set from the current sequence.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: <code>Set</code> - A set from the current sequence according to a specified key selector.  
**Throws**:

- `keySelector` must be a function or nullish
- `keySelector` produces duplicate keys


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract out of each element in th sequence the key (which is also the value) for each corresponding element in the set. The first parameter to the function is the elemnt in the sequence, and the second parameter represents the index of the element in the sequence. |

<a name="Linq+where"></a>

### linq.where(predicate) ⇒ [<code>Linq</code>](#Linq)
Filters the sequence of values based on a predicate.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - An enumerable that contains elements from the sequence that satisfy the condition.  
**Throws**:

- `predicate` must be a function


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | A function to test each source element for a condition; The first parameter to this test function is a source element, the second parameter of the function represents the index of the source element. |

<a name="Linq+union"></a>

### linq.union(secondIterable, [equalityComparer]) ⇒ [<code>Linq</code>](#Linq)
Produces a set union of the current sequence with the specified sequences. The sequence contains only the UNIQUE items.

**Kind**: instance method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A set union of the current sequence with the specified sequences.  
**Throws**:

- `secondIterable` must be iterable
- `equalityComparer` must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| secondIterable | <code>Iterable</code> | The second sequence. |
| [equalityComparer] | <code>function</code> | An equality comparer to be used to compare two items. |

<a name="Linq.Version"></a>

### Linq.Version ⇒ <code>string</code>
Returns the version of this LINQ library.This is a read-only property used for diagnostics or compatibility checks.

**Kind**: static property of [<code>Linq</code>](#Linq)  
**Returns**: <code>string</code> - Semantic version string.  
<a name="Linq.from"></a>

### Linq.from(iterable, [thisArg]) ⇒ [<code>Linq</code>](#Linq)
Initializes a LINQ query from the specified iterable.

**Kind**: static method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - - A LINQ query from the specified iterable.  

| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable</code> | An iterable object. |
| [thisArg] | <code>any</code> | An object to be used as `this` pointer in callback calls. |

<a name="Linq.empty"></a>

### Linq.empty(thisArg) ⇒ [<code>Linq</code>](#Linq)
Returns an empty sequence.

**Kind**: static method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - An empty sequence.  

| Param | Type | Description |
| --- | --- | --- |
| thisArg | <code>any</code> | Optional object to be used as this argument in any call in the returned sequence. |

<a name="Linq.range"></a>

### Linq.range(start, count, [thisArg]) ⇒ [<code>Linq</code>](#Linq)
Generates a sequence of integral numbers within a specified range.

**Kind**: static method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence of integral numbers within a specified range.  
**Throws**:

- `start` must be an integer
- `count` must be a non negative integer


| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | The value of the first integer in the sequence. |
| count | <code>number</code> | The number of sequential integers to generate. |
| [thisArg] | <code>any</code> | The object to be used as this pointer for subsequent LINQ calls. |

<a name="Linq.repeat"></a>

### Linq.repeat(value, count, [thisArg]) ⇒ [<code>Linq</code>](#Linq)
Generates a sequence that contains one repeated value.

**Kind**: static method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A sequence consist of the specified value repeated the specified count of times.  
**Throws**:

- `count` must be a non negative integer


| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value to be repeated. |
| count | <code>number</code> | The number of times to repeat the value in the generated sequence. |
| [thisArg] | <code>any</code> | The object to be used as this pointer for subsequent LINQ calls. |

<a name="Linq.zip"></a>

### Linq.zip(iterable1, iterable2, transform, thisArg) ⇒ [<code>Linq</code>](#Linq)
Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. The iteration stops when right after the last item of one of the sequences has reached.

**Kind**: static method of [<code>Linq</code>](#Linq)  
**Returns**: [<code>Linq</code>](#Linq) - A result sequence.  
**Throws**:

- `iterable1` must be iterable
- `iterable2` must be iterable
- `transform` must be a function


| Param | Type | Description |
| --- | --- | --- |
| iterable1 | <code>Iterable</code> | The first sequence |
| iterable2 | <code>Iterable</code> | The second sequence. |
| transform | <code>function</code> | The transform function. The first parameter is the item from the first sequence, The second parameter is the item from the second sequence. The third parameter is the index of these items within the sequences. |
| thisArg | <code>any</code> | Th object that will be used as this pointer in the transform function. |

<a name="LinqGroup"></a>

## LinqGroup
Represents a group of elements sharing a common key,typically used in LINQ operations like `groupBy` or `groupJoin`.This class is iterable and inherits all LINQ capabilities.

**Kind**: global class  

* [LinqGroup](#LinqGroup)
    * [new LinqGroup(key, iterable, thisArg)](#new_LinqGroup_new)
    * [.key](#LinqGroup+key) ⇒ <code>any</code>
    * [.toString()](#LinqGroup+toString) ⇒ <code>string</code>

<a name="new_LinqGroup_new"></a>

### new LinqGroup(key, iterable, thisArg)
Initializes a new instance of LinqGroup, wrapping a group with a specific key.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key that is common to the group's elements. |
| iterable | <code>Iterable.&lt;any&gt;</code> | An iterable of grouped items. |
| thisArg | <code>any</code> | Optional `this` context for callback usage. |

<a name="LinqGroup+key"></a>

### linqGroup.key ⇒ <code>any</code>
Gets the key shared by all elements in this group.

**Kind**: instance property of [<code>LinqGroup</code>](#LinqGroup)  
<a name="LinqGroup+toString"></a>

### linqGroup.toString() ⇒ <code>string</code>
Returns a string representation of the group, including its key.

**Kind**: instance method of [<code>LinqGroup</code>](#LinqGroup)  
**Returns**: <code>string</code> - A string in the format: `LinqGroup (key=...)`.  
<a name="LinqOrder"></a>

## LinqOrder
Represents a LINQ-ordered iterable, allowing chained sorting with `thenBy` and `thenByDescending`.

**Kind**: global class  

* [LinqOrder](#LinqOrder)
    * [new LinqOrder(iterable, keySelector, comparer, desc, thisArg)](#new_LinqOrder_new)
    * [.thenBy([keySelector], [comparer])](#LinqOrder+thenBy) ⇒ [<code>Linq</code>](#Linq)
    * [.thenByDescending([keySelector], [comparer])](#LinqOrder+thenByDescending) ⇒ [<code>Linq</code>](#Linq)

<a name="new_LinqOrder_new"></a>

### new LinqOrder(iterable, keySelector, comparer, desc, thisArg)
Initializes a new instance of LinqOrder used for sorting operations.Returned by `orderBy()` or `orderByDescending()`.

**Throws**:

- <code>Error</code> If `keySelector` or `comparer` is invalid.


| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable.&lt;any&gt;</code> | The iterable to be wrapped. |
| keySelector | <code>function</code> \| <code>null</code> | Function to extract key from each item (optional). |
| comparer | <code>function</code> \| <code>null</code> | Function to compare keys (optional). |
| desc | <code>boolean</code> | If `true`, applies descending order. |
| thisArg | <code>any</code> | The context (`this`) for user-defined callbacks. |

<a name="LinqOrder+thenBy"></a>

### linqOrder.thenBy([keySelector], [comparer]) ⇒ [<code>Linq</code>](#Linq)
Performs a subsequent ordering of the elements in this sequence in ascending order, optionally by using the specified keySelector and comparer.A call to orderBy/orderByDescending must be made before changing other calls to thenBy/thenByDescending.This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

**Kind**: instance method of [<code>LinqOrder</code>](#LinqOrder)  
**Returns**: [<code>Linq</code>](#Linq) - The elements of the sequence in ascending subsequent order, optionally by using the specified keySelector and comparer.  
**Throws**:

- A call to orderBy/orderByDescending must come before calling to thenBy/thenByDescending.
- keySelector must be a function or nullish
- comparer must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract a key from an element. By default the element is used as the key. |
| [comparer] | <code>function</code> | An optional comparer to compare keys. By default a simple comparison is made. |

<a name="LinqOrder+thenByDescending"></a>

### linqOrder.thenByDescending([keySelector], [comparer]) ⇒ [<code>Linq</code>](#Linq)
Performs a subsequent ordering of the elements in this sequence in descending order, optionally by using the specified keySelector and comparer.A call to orderBy/orderByDescending must be made before changing other calls to thenBy/thenByDescending.This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

**Kind**: instance method of [<code>LinqOrder</code>](#LinqOrder)  
**Returns**: [<code>Linq</code>](#Linq) - The elements of the sequence in descending subsequent order, optionally by using the specified keySelector and comparer.  
**Throws**:

- <code>Error</code> A call to orderBy/orderByDescending must come before calling to thenBy/thenByDescending.
- <code>Error</code> keySelector must be a function or nullish
- <code>Error</code> comparer must be a function or nullish


| Param | Type | Description |
| --- | --- | --- |
| [keySelector] | <code>function</code> | An optional function to extract a key from an element. Ny default the element is used as the key. |
| [comparer] | <code>function</code> | An optional comparer to compare keys. By default a simple comparison is made. |

<a name="Statistics"></a>

## Statistics
Represents statistical measurements for a numeric sequence.Provides access to summary statistics (count, min, max, average, range, sum, variance, standard deviation) and, optionally, extended calculations (mode, median) if computed during construction.Use `clone()` to create a duplicate of an instance, and `toJSON()` to serialize it.

**Kind**: global class  

* [Statistics](#Statistics)
    * [new Statistics(count, minimum, maximum, range, average, summary, mode, median, variance, standardDeviation)](#new_Statistics_new)
    * _instance_
        * [.count](#Statistics+count) ⇒ <code>number</code>
        * [.minimum](#Statistics+minimum) ⇒ <code>number</code> \| <code>undefined</code>
        * [.maximum](#Statistics+maximum) ⇒ <code>number</code> \| <code>undefined</code>
        * [.range](#Statistics+range) ⇒ <code>number</code> \| <code>undefined</code>
        * [.average](#Statistics+average) ⇒ <code>number</code> \| <code>undefined</code>
        * [.summary](#Statistics+summary) ⇒ <code>number</code>
        * [.mode](#Statistics+mode) ⇒ <code>Array.&lt;number&gt;</code> \| <code>undefined</code>
        * [.median](#Statistics+median) ⇒ <code>number</code> \| <code>undefined</code>
        * [.variance](#Statistics+variance) ⇒ <code>number</code> \| <code>undefined</code>
        * [.standardDeviation](#Statistics+standardDeviation) ⇒ <code>number</code> \| <code>undefined</code>
        * [.clone()](#Statistics+clone) ⇒ [<code>Statistics</code>](#Statistics)
        * [.toJSON()](#Statistics+toJSON) ⇒ <code>Object</code>
        * [.equal(value, precision)](#Statistics+equal)
    * _static_
        * [.empty()](#Statistics.empty) ⇒ [<code>Statistics</code>](#Statistics)
        * [.fromJSON(json)](#Statistics.fromJSON) ⇒ [<code>Statistics</code>](#Statistics)

<a name="new_Statistics_new"></a>

### new Statistics(count, minimum, maximum, range, average, summary, mode, median, variance, standardDeviation)
Initializes a new instance of Statistics.


| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The number of items in the sequence. |
| minimum | <code>number</code> \| <code>undefined</code> | The minimal value in the sequence, or undefined if not applicable. |
| maximum | <code>number</code> \| <code>undefined</code> | The maximal value in the sequence, or undefined if not applicable. |
| range | <code>number</code> \| <code>undefined</code> | The range of the sequence (maximum - minimum), or undefined if not applicable. |
| average | <code>number</code> \| <code>undefined</code> | The average value of the sequence, or undefined if not applicable. |
| summary | <code>number</code> | The sum of all values in the sequence. |
| mode | <code>Array.&lt;number&gt;</code> \| <code>undefined</code> | The most frequent values, or undefined if not calculated. |
| median | <code>number</code> \| <code>undefined</code> | The middle value when sorted, or undefined if not calculated. |
| variance | <code>number</code> \| <code>undefined</code> | The variance of the sequence, or undefined if not calculated. |
| standardDeviation | <code>number</code> \| <code>undefined</code> | The standard deviation (square root of variance), or undefined if not calculated. |

<a name="Statistics+count"></a>

### statistics.count ⇒ <code>number</code>
The number of items in the sequence.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> - - The number of items in the sequence.  
<a name="Statistics+minimum"></a>

### statistics.minimum ⇒ <code>number</code> \| <code>undefined</code>
The minimal value in the sequence, or undefined if not applicable.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The minimal value in the sequence, or undefined if not applicable.  
<a name="Statistics+maximum"></a>

### statistics.maximum ⇒ <code>number</code> \| <code>undefined</code>
The maximal value in the sequence, or undefined if not applicable.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The maximal value in the sequence, or undefined if not applicable.  
<a name="Statistics+range"></a>

### statistics.range ⇒ <code>number</code> \| <code>undefined</code>
The range of the sequence (maximum - minimum), or undefined if not applicable.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The range of the sequence (maximum - minimum), or undefined if not applicable.  
<a name="Statistics+average"></a>

### statistics.average ⇒ <code>number</code> \| <code>undefined</code>
The average value of the sequence, or undefined if not applicable.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The average value of the sequence, or undefined if not applicable.  
<a name="Statistics+summary"></a>

### statistics.summary ⇒ <code>number</code>
The sum of all values in the sequence.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> - - The sum of all values in the sequence.  
<a name="Statistics+mode"></a>

### statistics.mode ⇒ <code>Array.&lt;number&gt;</code> \| <code>undefined</code>
The most frequent values, or undefined if not calculated.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>Array.&lt;number&gt;</code> \| <code>undefined</code> - - The most frequent values, or undefined if not calculated.  
<a name="Statistics+median"></a>

### statistics.median ⇒ <code>number</code> \| <code>undefined</code>
The middle value when sorted, or undefined if not calculated.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The middle value when sorted, or undefined if not calculated.  
<a name="Statistics+variance"></a>

### statistics.variance ⇒ <code>number</code> \| <code>undefined</code>
The variance of the sequence, or undefined if not calculated.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The variance of the sequence, or undefined if not calculated.  
<a name="Statistics+standardDeviation"></a>

### statistics.standardDeviation ⇒ <code>number</code> \| <code>undefined</code>
The standard deviation (square root of variance), or undefined if not calculated.

**Kind**: instance property of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>number</code> \| <code>undefined</code> - - The standard deviation (square root of variance), or undefined if not calculated.  
<a name="Statistics+clone"></a>

### statistics.clone() ⇒ [<code>Statistics</code>](#Statistics)
Creates a deep copy of the current `Statistics` instance.

**Kind**: instance method of [<code>Statistics</code>](#Statistics)  
**Returns**: [<code>Statistics</code>](#Statistics) - A cloned `Statistics` instance with the same values.  
<a name="Statistics+toJSON"></a>

### statistics.toJSON() ⇒ <code>Object</code>
Returns a plain JSON object representing the current `Statistics` instance.

**Kind**: instance method of [<code>Statistics</code>](#Statistics)  
**Returns**: <code>Object</code> - A JSON-serializable object containing all statistical properties.  
<a name="Statistics+equal"></a>

### statistics.equal(value, precision)
Returns `true` if the current object equal to the specified value.

**Kind**: instance method of [<code>Statistics</code>](#Statistics)  

| Param | Type | Description |
| --- | --- | --- |
| value | [<code>Statistics</code>](#Statistics) | `true` if the current object equal to the specified. |
| precision | <code>number</code> | The number of digits after the decimal point to compare. |

<a name="Statistics.empty"></a>

### Statistics.empty() ⇒ [<code>Statistics</code>](#Statistics)
Creates a Statistics instance representing an empty sequence.

**Kind**: static method of [<code>Statistics</code>](#Statistics)  
**Returns**: [<code>Statistics</code>](#Statistics) - An instance with zero or undefined values and no extended calculations.  
<a name="Statistics.fromJSON"></a>

### Statistics.fromJSON(json) ⇒ [<code>Statistics</code>](#Statistics)
Creates a `Statistics` instance from a plain JSON object.

**Kind**: static method of [<code>Statistics</code>](#Statistics)  
**Returns**: [<code>Statistics</code>](#Statistics) - A new `Statistics` instance populated from the given JSON object.  
**Throws**:

- <code>Error</code> If the input is not an object or missing required fields.


| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | A plain object with the same properties as produced by `toJSON()`. |

<a name="NumericValue"></a>

## NumericValue : <code>number</code> \| <code>bigint</code>
A numeric value (number or bigint).

**Kind**: global typedef  
