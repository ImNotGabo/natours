import { BLACKLISTED_QUERIES } from './utils.js';

/**
 * Filters out blacklisted queries from the query object.
 *
 * @param {Object} queryObj - The original query object containing all queries.
 * @returns {Object} A new object containing only the allowed queries.
 */
export function filterQueries(queryObj) {
	return Object.keys(queryObj)
		.filter((query) => !BLACKLISTED_QUERIES.includes(query))
		.reduce((obj, key) => {
			obj[key] = queryObj[key];
			return obj;
		}, {});
}
