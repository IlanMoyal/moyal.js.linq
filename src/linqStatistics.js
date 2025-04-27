/**
 * File: src/LinqStatistics.js 
 */

/**
 * Represents statistical measurements for a numeric sequence.
 * 
 * Provides access to summary statistics (count, min, max, average, range, sum, variance, standard deviation) 
 * and, optionally, extended calculations (mode, median) if computed during construction.
 * 
 * Use `clone()` to create a duplicate of an instance, and `toJSON()` to serialize it.
 * 
 * @class
 */
export default class Statistics {
	#_count = 0;
	#_minimum = 0.0;
	#_maximum = 0.0;
	#_range = 0;
	#_average = 0;
	#_summary = 0;
	#_mode = 0;
	#_median = 0;
	#_variance = 0;
	#_standardDeviation = 0;

	/**
	 * Initializes a new instance of Statistics.
	 * @param {number} count - The number of items in the sequence.
	 * @param {(number | undefined)} minimum - The minimal value in the sequence, or undefined if not applicable.
	 * @param {(number | undefined)} maximum - The maximal value in the sequence, or undefined if not applicable.
	 * @param {(number | undefined)} range - The range of the sequence (maximum - minimum), or undefined if not applicable.
	 * @param {(number | undefined)} average - The average value of the sequence, or undefined if not applicable.
	 * @param {number} summary - The sum of all values in the sequence.
	 * @param {(Array<number> | undefined)} mode - The most frequent values, or undefined if not calculated.
	 * @param {(number | undefined)} median - The middle value when sorted, or undefined if not calculated.
	 * @param {(number | undefined)} variance - The variance of the sequence, or undefined if not calculated.
	 * @param {(number | undefined)} standardDeviation - The standard deviation (square root of variance), or undefined if not calculated.
	 */
	constructor(count, minimum, maximum, range, average, summary, mode, median, variance, standardDeviation) {
		this.#_count = count ?? 0;
		this.#_minimum = minimum ?? undefined;
		this.#_maximum = maximum ?? undefined;
		this.#_range = range ?? undefined;
		this.#_average = average ?? undefined;
		this.#_summary = summary ?? 0;
		this.#_mode = mode == null ? undefined : Array.isArray(mode) ? mode : [mode];
		this.#_median = median ?? undefined;
		this.#_variance = variance ?? undefined;
		this.#_standardDeviation = standardDeviation ?? undefined;
	}

	/**
	 * The number of items in the sequence.
	 * 
	 * @returns {number} - The number of items in the sequence.
	 */
	
	get count() { return this.#_count; }

	/**
	 * The minimal value in the sequence, or undefined if not applicable.
	 * 
	 * @returns {(number | undefined)} - The minimal value in the sequence, or undefined if not applicable.
	 */
	get minimum() { return this.#_minimum; }

	/**
	 * The maximal value in the sequence, or undefined if not applicable.
	 * 
	 * @returns {(number | undefined)} - The maximal value in the sequence, or undefined if not applicable.
	 */
	get maximum() { return this.#_maximum; }

	/**
	 * The range of the sequence (maximum - minimum), or undefined if not applicable.
	 * 
	 * @returns {(number | undefined)} - The range of the sequence (maximum - minimum), or undefined if not applicable.
	 */
	get range() { return this.#_range; }

	/**
	 * The average value of the sequence, or undefined if not applicable.
	 * 
	 * @returns {(number | undefined)} - The average value of the sequence, or undefined if not applicable.
	 */
	get average() { return this.#_average; }

	/**
	 * The sum of all values in the sequence.
	 * 
	 * @returns {number} - The sum of all values in the sequence.
	 */
	get summary() { return this.#_summary; }
	
	/**
	 * The most frequent values, or undefined if not calculated.
	 * 
	 * @returns {(Array<number> | undefined)} - The most frequent values, or undefined if not calculated.
	 */
	get mode() { return this.#_mode; }

	/**
	 * The middle value when sorted, or undefined if not calculated.
	 *   
	 * @returns {(number | undefined)} - The middle value when sorted, or undefined if not calculated.
	 */
	get median() { return this.#_median; }

	/**
	 * The variance of the sequence, or undefined if not calculated.
	 * 
	 * @returns {(number | undefined)} - The variance of the sequence, or undefined if not calculated.
	 */
	get variance() { return this.#_variance; }

	/**
	 * The standard deviation (square root of variance), or undefined if not calculated.
	 * 
	 * @returns {(number | undefined)} - The standard deviation (square root of variance), or undefined if not calculated.
	 */
	get standardDeviation() { return this.#_standardDeviation; }

	/**
	 * Creates a Statistics instance representing an empty sequence.
	 * @returns {Statistics} An instance with zero or undefined values and no extended calculations. 
	 */
	static empty() {
		return new Statistics(
			0, // count
			undefined, // minimum
			undefined, // maximum
			undefined, // range
			undefined, // average
			0, // summary
			undefined, // mode
			undefined, // median
			undefined, // variance
			undefined // standardDeviation
		);
	}

	/**
	 * Creates a deep copy of the current `Statistics` instance.
	 * 
	 * @returns {Statistics} A cloned `Statistics` instance with the same values.
	 */
	clone() {
		return new Statistics(
			this.#_count,
			this.#_minimum,
			this.#_maximum,
			this.#_range,
			this.#_average,
			this.#_summary,
			this.#_mode == null ? undefined : [...this.#_mode],
			this.#_median,
			this.#_variance,
			this.#_standardDeviation
		);
	}

	/**
	 * Returns a plain JSON object representing the current `Statistics` instance.
	 * 
	 * @returns {Object} A JSON-serializable object containing all statistical properties.
	 */
	toJSON() {
		return {
			count: this.#_count,
			minimum: this.#_minimum,
			maximum: this.#_maximum,
			range: this.#_range,
			average: this.#_average,
			summary: this.#_summary,
			mode: this.#_mode,
			median: this.#_median,
			variance: this.#_variance,
			standardDeviation: this.#_standardDeviation
		};
	}

	/**
	 * Creates a `Statistics` instance from a plain JSON object.
	 * 
	 * @param {Object} json - A plain object with the same properties as produced by `toJSON()`.
	 * @returns {Statistics} A new `Statistics` instance populated from the given JSON object.
	 * @throws {Error} If the input is not an object or missing required fields.
	 */
	static fromJSON(json) {
		if (typeof json !== "object" || json === null) {
			throw new Error("Invalid JSON object for Statistics.");
		}

		return new Statistics(
			json.count ?? 0,
			json.minimum ?? undefined,
			json.maximum ?? undefined,
			json.range ?? undefined,
			json.average ?? undefined,
			json.summary ?? 0,
			json.mode == null ? undefined : Array.isArray(json.mode) ? [...json.mode] : [json.mode],
			json.median ?? undefined,
			json.variance ?? undefined,
			json.standardDeviation ?? undefined
		);
	}
}
