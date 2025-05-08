/*!
 * File: examples/example-03-groupby.js
 */

import { Linq } from "../src/index.js";

const fruits = ["apple", "apricot", "banana", "blueberry", "cherry"];

const groups = Linq
    .from(fruits)
    .groupBy(
        x => x[0],                  // group by first letter
        x => x.toUpperCase(),       // element selector
        g => ({ letter: g.key, items: g.toArray() }) // result selector
    )
    .toArray();

console.log(groups);
/*
[
  { letter: 'A', items: [ 'APPLE', 'APRICOT' ] },
  { letter: 'B', items: [ 'BANANA', 'BLUEBERRY' ] },
  { letter: 'C', items: [ 'CHERRY' ] }
]
*/
