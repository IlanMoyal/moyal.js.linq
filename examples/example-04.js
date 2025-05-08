/*!
 * File: examples/example-04-statistics.js
 */

import { Linq } from "../src/index.js";

const grades = [90, 70, 90, 80, 90, 100];

const stats = Linq
    .from(grades)
    .statistics({ mode: true, median: true });

console.log(stats.toJSON());
/*
{
  count: 6,
  minimum: 70,
  maximum: 100,
  range: 30,
  average: 86.666...,
  summary: 520,
  mode: [90],
  median: 90,
  variance: 88.888...,
  standardDeviation: 9.428090...
}
*/
