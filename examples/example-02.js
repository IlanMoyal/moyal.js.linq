/*!
 * File: examples/example-02-aggregate.js
 */

import { Linq } from "../src/index.js";

const words = ["a", "bb", "ccc"];

const totalLength = Linq
    .from(words)
    .aggregate(0, (word, acc) => acc + word.length);

console.log(totalLength); // Output: 6