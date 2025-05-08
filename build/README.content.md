<!-- TOC-SECTION-MARKER -->

- [Features](#features)
- [Quick Start](#quick-start)
- [API Overview](#api-overview)

<!-- CONTENT-SECTION-MARKER -->

## Features

- Fully Chainable: Every operation returns a LINQ-like wrapper to continue your query seamlessly.
- Deferred Execution: Most operations are lazily evaluated using generators.
- Zero Dependencies: No third-party libraries required. Works in both Node.js and browsers.
- Rich Set of Operators: Includes filtering, projection, ordering, joining, grouping, set operations, aggregation, and statistics.
- Built-in Statistics: Easily compute count, sum, average, median, mode, variance, and standard deviation.
- Extensible Comparers & Selectors: All key-based operations support custom comparison and projection logic.
- Supports thisArg Binding: Pass custom context for user-defined callbacks.
- Typed Statistics API: Strongly encapsulated results with .clone(), .equal(), and .toJSON() support.


## Quick Start

```js
import { Linq } from '@moyal/js-linq';

const numbers = [1, 2, 3, 4, 5, 6];

const result = Linq
    .from(numbers)
    .where(x => x % 2 === 0)
    .select(x => x * 10)
    .toArray();

console.log(result); // Output: [20, 40, 60]

/*

In this quick start example:

- We filter out odd numbers.
- We multiply each number in 10.
- Dumping the result iterable to array.

*/

```

For more code examples, see also **"/{{examplesFolder}}"** and (or) **"/{{testFolder}}/units"** in [GitHub Repository](https://github.com/{{git:username}}/{{git:repository-name}}).

## API Overview

| Method / Static | Purpose |
|----------------|---------|
| `from(iter)` | Start LINQ chain from iterable |
| `aggregate(seed, fn)` | Accumulate values with custom logic |
| `all(fn)` | Check if all elements match predicate |
| `any([fn])` | Check if any element exists or matches |
| `append(value)` | Append a value to the sequence |
| `average()` | Compute average (returns `undefined` if non-numeric) |
| `concat(...iterables)` | Concatenate multiple sequences |
| `contains(value, [comparer])` | Check for value presence |
| `count()` | Count elements |
| `defaultIfEmpty(val)` | Provide default if empty |
| `distinct([comparer])` | Unique values with optional comparer |
| `duplicate(n, inplace)` | Repeat sequence `n` times |
| `elementAt(i)` / `elementAtOrDefault(i, def)` | Get item by index (or fallback) |
| `empty()` | Return an empty sequence |
| `except(other, [comparer])` | Exclude items in another iterable |
| `first([fn])` / `firstOrDefault(def, [fn])` | Get first (matching) element |
| `forEach(fn)` | Run function for each item |
| `groupBy(keyFn, elFn, resFn, cmp)` | Group by key with full control |
| `groupJoin(...)` | Join left with grouped-right by key |
| `intersect(other, [cmp])` | Common unique elements |
| `join(...)` | Standard inner join |
| `last([fn])` / `lastOrDefault(def, [fn])` | Get last (matching) element |
| `max([cmp])` / `min([cmp])` | Get maximum/minimum value |
| `orderBy([keyFn], [cmp])` | Sort ascending |
| `orderByDescending(...)` | Sort descending |
| `thenBy(...)` / `thenByDescending(...)` | Chain ordering |
| `prepend(value)` | Add value at start |
| `range(start, count)` | Generate integer range |
| `removeNullishes()` | Filter out `null`/`undefined` |
| `repeat(value, count)` | Repeat value `count` times |
| `reverse()` | Reverse sequence |
| `select(fn)` | Transform each element |
| `selectMany(collFn, resFn)` | Flatten nested sequences |
| `sequenceEqual(other, [cmp])` | Compare two sequences |
| `single([fn])` / `singleOrDefault(def, [fn])` | Enforce single (matching) element |
| `skip(n)` / `skipLast(n)` | Skip `n` items (from start/end) |
| `skipWhile(fn)` | Skip until predicate fails |
| `statistics([extended])` | Return statistics object |
| `sum()` | Sum of all elements |
| `take(n)` / `takeLast(n)` | Take `n` items (from start/end) |
| `takeWhile(fn)` | Take while predicate passes |
| `toArray()` | Convert to array |
| `toMap(keyFn, valFn)` | Build Map from sequence |
| `toDictionary(...)` | Alias for `toMap` |
| `toSet([keyFn])` | Build Set from sequence |
| `where(fn)` | Filter by predicate |
| `union(other, [cmp])` | Union of sequences (unique values) |
| `zip(iter1, iter2, transform)` | Zip two sequences with transform |
| `Statistics` | Encapsulates count, average, median, mode, etc. |

**Note**: Many methods support optional thisArg to bind context in user-defined functions.
