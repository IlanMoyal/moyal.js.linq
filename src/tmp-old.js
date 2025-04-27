// static #_statistics(thisArg, iterable, extended) {
	//     /* 
	//         * basic calculations: 
	//         * - count
	//         * - minimum
	//         * - maximum
	//         * - summary
	//         * - average
	//         * - range
	//         * 
	//         * extended calculations:
	//         * - mode
	//         * - median
	//         * - variance
	//         * - standard deviation
	//         */

	//     const arr = Array.from(iterable);

	//     const result = {
	//         count: arr.length,
	//         minimum: undefined,
	//         maximum: undefined,
	//         summary: 0,
	//         average: undefined,
	//         range: undefined,
	//         mode: undefined,
	//         median: undefined,
	//         variance: undefined,
	//         standardDeviation: undefined,
	//         extendedCalculations: extended
	//     }

	//     if (arr.length > 0) 
	//     {
	//         if (extended === true) { arr.sort((a, b) => a - b); /* for median and mode */ }

	//         result.minimum = arr[0], result.maximum = extended ? arr[arr.length - 1] /* already sorted */ : arr[0];

	//         let pos = 0;
	//         let value;
	//         do {
	//             if (!TypeCheck.isNumber(value = arr[pos])) {
	//                 /* this also validates the value of the first element! */
	//                 throw new Error(Errors.getMessage("MUST_BE_NUMBER_all_sequence_elements"));
	//             }

	//             result.summary += value;

	//             if (!extended) {
	//                 /*
	//                  * On extended mode, see the initialization of minimum and maximum.
	//                  * When the array is sorted, the minimum is the first element and the maximum is the last,
	//                  * so no further calculation is needed.
	//                  */
	//                 result.minimum = Math.min(result.minimum, value);
	//                 result.maximum = Math.max(result.maximum, value);
	//             }
	//         } while (++pos < arr.length);

	//         /* sets the results so far */
	//         result.average = result.summary / result.count;
	//         result.range = result.maximum - result.minimum;

	//         if (extended) {
	//             /* median */
	//             const mid = Math.floor(arr.length / 2);
	//             result.median = arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
				
				
	//             const modMap = new Map(); /* for mode */
	//             let variance = 0; /* for variance, standardDeviation */
	//             for (value of arr) {
	//                 if(modMap.has(value)){
	//                     modMap.get(value).rep++;
	//                 }
	//                 else {
	//                     modMap.set(value, {val: value, rep: 1});
	//                 }
	//                 variance += (value - result.average) ** 2;
	//             }
				
	//             result.mode = [];

	//             /* sort ascending by repetition count to find the most frequent value last. */
	//             let modArr = Array.from(modMap.values()).sort((a, b) => a.rep - b.rep);
				
	//             /* the last item, is obviosly most frequent */
	//             result.mode.push(modArr[modArr.length - 1].val);
				
	//             /* check backwards from the second item from the end */
	//             let i = modArr.length - 2;
	//             for(; i >= 0; i--) {
	//                 if(modArr[i + 1].rep > modArr[i].rep) {
	//                     /* the current item repetition is less than the previous, we can break! */
	//                     break;
	//                 }
	//                 result.mode.push(modArr[i].val);
	//             }

	//             result.mode.sort((a,b) => a-b);
	//             variance /= result.count;
	//             result.variance = variance;
	//             result.standardDeviation = Math.sqrt(variance);
	//         }
	//     }

	//     return Linq.Statistics.fromJSON(result);
	// }

	// static #_statistics(thisArg, iterable, extended) {
	//     /* 
	//         * Basic calculations: 
	//         * - count
	//         * - minimum
	//         * - maximum
	//         * - summary
	//         * - average
	//         * - range
	//         *
	//         * Extended calculations (optional):
	//         * - mode
	//         * - median
	//         * - variance
	//         * - standard deviation
	//         *
	//         * Welford’s algorithm used for variance.
	//         * Mode calculation is optimized to avoid useless results when all repetitions are 1.
	//         */
	
	//     const result = {
	//         count: 0,
	//         minimum: undefined,
	//         maximum: undefined,
	//         summary: 0,
	//         average: undefined,
	//         range: undefined,
	//         mode: undefined,
	//         median: undefined,
	//         variance: undefined,
	//         standardDeviation: undefined,
	//         extendedCalculations: extended === true
	//     };
	
	//     let mean = 0, M2 = 0;  // For Welford variance
	//     let freqMap = extended ? new Map() : null; // For mode
	//     let maxRep = 0; // Max repetition count for mode
	//     let values = extended ? [] : null; // For median calculation
	
	//     for (const item of iterable) {
	//         if (!TypeCheck.isNumber(item)) {
	//             throw new Error(Errors.getMessage("MUST_BE_NUMBER_all_sequence_elements"));
	//         }
	
	//         if (values) { values.push(item); }
	
	//         result.count++;
	//         result.summary += item;
	
	//         if (result.minimum === undefined || item < result.minimum) {
	//             result.minimum = item;
	//         }
	//         if (result.maximum === undefined || item > result.maximum) {
	//             result.maximum = item;
	//         }
	
	//         const delta = item - mean;
	//         mean += delta / result.count;
	//         const delta2 = item - mean;
	//         M2 += delta * delta2;
	
	//         if (freqMap) {
	//             const rep = (freqMap.get(item) ?? 0) + 1;
	//             freqMap.set(item, rep);
	//             if (rep > maxRep) { maxRep = rep; }
	//         }
	//     }
	
	//     if (result.count > 0) {
	//         result.average = result.summary / result.count;
	//         result.range = result.maximum - result.minimum;
	//     }
	
	//     if (extended && result.count > 0) {
	//         // Median
	//         values.sort((a, b) => a - b);
	//         const mid = Math.floor(values.length / 2);
	//         result.median = values.length % 2
	//             ? values[mid]
	//             : (values[mid - 1] + values[mid]) / 2;
	
	//         // Mode
	//         if (maxRep > 1) {
	//             const modes = [];
	//             for (const [val, rep] of freqMap) {
	//                 if (rep === maxRep) {
	//                     modes.push(val);
	//                 }
	//             }
	//             modes.sort((a, b) => a - b);
	//             result.mode = modes;
	//         } else {
	//             result.mode = undefined;
	//         }
	
	//         // Variance and Standard Deviation
	//         result.variance = M2 / result.count;
	//         result.standardDeviation = Math.sqrt(result.variance);
	//     }
	
	//     return Linq.Statistics.fromJSON(result);
	// }