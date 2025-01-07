import Tour from '../models/toursModel.js';
import { pagination } from '../utils/pagination.js';
import { DEFAULTS } from '../config.js';
import { filterQueries } from '../utils/filterQueries.js';
import { convertToMongoQuery } from '../utils/convertToMongoQuery.js';
import { sortQueryResults } from '../utils/sortQueryResults.js';
import { limitQueryFields } from '../utils/limitQueryFields.js';

export async function aliasTopTours(req, res, next) {
	req.query.limit = DEFAULTS.LIMIT;
	req.query.sort = 'ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
}

export async function getAllTours(req, res) {
	try {
		const queryObj = { ...req.query };

		// 1) Filter queries
		const filteredObj = filterQueries(queryObj);
		const mongoQuery = convertToMongoQuery(filteredObj);

		// 2) Sort queries
		let query = Tour.find(mongoQuery);
		query = sortQueryResults(query, req.query.sort);
		query = limitQueryFields(query, req.query.fields);

		// 3) Pagination
		const { SKIP, LIMIT } = pagination(req);
		const numTour = await Tour.countDocuments();
		query = query.skip(SKIP).limit(LIMIT);

		if (req.query.page && SKIP >= numTour) {
			return res.status(404).json({
				status: 'fail',
				message:
					'This page does not exist. Please adjust your pagination parameters.',
			});
		}

		// EXECUTE QUERY
		const tours = await query;

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message:
				error.message || 'An unexpected error occurred while retrieving tours.',
		});
	}
}

export async function getTour(req, res) {
	try {
		const tour = await Tour.findById(req.params.id);
		if (!tour) {
			return res.status(404).json({
				status: 'fail',
				message: `No tour found with ID: ${req.params.id}`,
			});
		}
		res.status(200).json({
			status: 'success',
			data: { tour },
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error.message || `Invalid ID: ${req.params.id}`,
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
			message:
				error.message ||
				'Failed to create a new tour. Please check your input data.',
		});
	}
}

export async function updateTour(req, res) {
	try {
		const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedTour) {
			return res.status(404).json({
				status: 'fail',
				message: `No tour found with ID: ${req.params.id}`,
			});
		}
		res.status(200).json({
			status: 'success',
			data: {
				updatedTour,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message:
				error.message ||
				`Failed to update tour with ID: ${req.params.id}. Please check your input data.`,
		});
	}
}

export async function deleteTour(req, res) {
	try {
		const deletedTour = await Tour.findByIdAndDelete(req.params.id);
		if (!deletedTour) {
			return res.status(404).json({
				status: 'fail',
				message: `No tour found with ID: ${req.params.id}`,
			});
		}
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message:
				error.message || `Failed to delete tour with ID: ${req.params.id}`,
		});
	}
}

export async function getTourStats(req, res) {
	try {
		const stats = await Tour.aggregate([
			{
				$match: {
					ratingsAverage: { $gte: 4.5 },
				},
			},
			{
				$group: {
					_id: { $toUpper: '$difficulty' },
					numTour: { $sum: 1 },
					numRatings: { $sum: '$ratingsQuantity' },
					avgRating: { $avg: '$ratingsAverage' },
					avgPrice: { $avg: '$price' },
					minPrice: { $min: '$price' },
					maxPrice: { $max: '$price' },
				},
			},
		]);

		res.status(200).json({
			status: 'success',
			data: {
				stats,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message:
				error.message || 'An error occurred while calculating tour statistics.',
		});
	}
}

export async function getMonthlyPlan(req, res) {
	try {
		const year = parseInt(req.params.year, 10);
		const plan = await Tour.aggregate([
			{
				$unwind: '$startDates',
			},
			{
				$match: {
					startDates: {
						$gte: new Date(`${year}-01-01`),
						$lte: new Date(`${year}-12-31`),
					},
				},
			},
			{
				$group: {
					_id: { $month: '$startDates' },
					numTourStarts: { $sum: 1 },
					tours: { $push: '$name' },
				},
			},
			{
				$addFields: { month: '$_id' },
			},
			{
				$project: { _id: 0 },
			},
			{
				$sort: { numTourStarts: -1 },
			},
			{
				$limit: 12,
			},
		]);
		res.status(200).json({
			status: 'success',
			data: {
				plan,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message:
				error.message ||
				`Failed to retrieve the monthly plan for year: ${req.params.year}`,
		});
	}
}
