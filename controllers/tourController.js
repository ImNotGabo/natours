import Tour from '../models/toursModel.js';
import { BLACKLISTED_QUERIES } from '../utils/utils.js';

export async function getAllTours(req, res) {
	try {
		const queryObj = { ...req.query };
		/**
		 * Filters out blacklisted queries from the query object.
		 *
		 * @param {Object} queryObj - The original query object containing all queries.
		 * @returns {Object} A new object containing only the allowed queries.
		 */
		const filteredObj = Object.keys(queryObj)
			.filter((query) => !BLACKLISTED_QUERIES.includes(query))
			.reduce((obj, key) => {
				obj[key] = queryObj[key];
				return obj;
			}, {});

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
		const queryStr = JSON.stringify(filteredObj).replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		const query = Tour.find(JSON.parse(queryStr));
		const tours = await query;

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (error) {
		res.status(404).json({
			staus: 'fail',
			message: error,
		});
	}
}

export async function getTour(req, res) {
	try {
		const tourID = await Tour.findById(req.params.id);
		// Tour.findOne({ _id: req.params.id })
		res.status(200).json({
			status: 'success',
			data: { tourID },
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: `Could not found tour: ${error}`,
		});
	}
}

export async function createTour(req, res) {
	try {
		const newTour = await Tour.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: `Could not create a new tour: ${error}`,
		});
	}
}

export async function updateTour(req, res) {
	try {
		const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'success',
			data: {
				updatedTour,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: `Could not update tour: ${error}`,
		});
	}
}

export async function deleteTour(req, res) {
	try {
		const deleteTour = await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: deleteTour,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: `Could not delete tour: ${error}`,
		});
	}
}
