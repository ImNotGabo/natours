import Tour from '../models/toursModel.js';

export async function getAllTours(req, res) {
	try {
		const tours = await Tour.find();
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
			message: `Tour not found: ${error}`,
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
			message: error,
		});
	}
}

export function updateTour(req, res) {
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>',
		},
	});
}

export function deleteTour(req, res) {
	res.status(204).json({
		status: 'success',
		data: null,
	});
}
