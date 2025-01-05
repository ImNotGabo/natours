import { DEFAULTS } from '../config.js';
/**
 * Applies field limiting to the query.
 *
 * @param {Object} query - Mongoose query object.
 * @param {string} fields - Fields to select from the request query.
 * @returns {Object} Updated query with field limiting applied.
 */
export function limitQueryFields(query, fields) {
	if (fields) {
		const fieldsString = fields.replace(/,/g, ' ');
		return query.select(`${fieldsString} ${DEFAULTS.ID}`);
	}
	return query.select(DEFAULTS.FIELDS);
}
