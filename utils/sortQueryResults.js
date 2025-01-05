import { DEFAULTS } from '../config.js';

/**
 * Applies sorting to the query.
 *
 * @param {Object} query - Mongoose query object.
 * @param {string} sortBy - Sorting criteria from the request query.
 * @returns {Object} Updated query with sorting applied.
 */

export function sortQueryResults(query, sortBy) {
	if (sortBy) {
		const sortString = sortBy.replace(/,/g, ' ');
		return query.sort(sortString);
	}
	return query.sort(DEFAULTS.SORT);
}
