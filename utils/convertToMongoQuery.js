/**
 * Converts the filtered object to a query string with MongoDB operators.
 *
 * This function takes a filtered object, converts it to a JSON string, and replaces
 * certain comparison operators (gte, gt, lte, lt) with their MongoDB equivalents
 * prefixed by a dollar sign ($).
 *
 * @param {Object} filteredObj - The object containing the filtered query parameters.
 * @returns {string} The query string with MongoDB operators.
 */
export function convertToMongoQuery(filteredObj) {
	const queryStr = JSON.stringify(filteredObj).replace(
		/\b(gte|gt|lte|lt)\b/g,
		(match) => `$${match}`
	);
	return JSON.parse(queryStr);
}
