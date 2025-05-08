/*!
 * File: examples/example-05-join.js
 */

import { Linq } from "../src/index.js";

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

const posts = [
    { userId: 1, title: "Hello" },
    { userId: 2, title: "Hi" },
    { userId: 1, title: "World" }
];

const result = Linq
    .from(users)
    .join(
        posts,
        u => u.id,
        p => p.userId,
        (u, p) => `${u.name} wrote "${p.title}"`
    )
    .toArray();

console.log(result);
// Output: ['Alice wrote "Hello"', 'Alice wrote "World"', 'Bob wrote "Hi"']
