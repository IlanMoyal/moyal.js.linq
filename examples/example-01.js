/*!
 * File: examples/examples-01.js
 */

import { Linq } from "../src/index.js"

const numbers = [1, 2, 3, 4, 5, 6];

const result = Linq
    .from(numbers)
    .where(x => x % 2 === 0)
    .select(x => x * 10)
    .toArray();

console.log(result); // Output: [20, 40, 60]
