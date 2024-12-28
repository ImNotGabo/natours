import Tour from '../models/toursModel.js';

export function checkBody(req, res, next) {
	const { name, price } = req.body;
	if (!name || !price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing name or price',
		});
	}
	next();
}

export function getAllTours(req, res) {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		/* results: tours.length,
		data: { tours }, */
	});
}

export function getTour(req, res) {
	const id = parseInt(req.params.id);
	/* const tour = tours.find((ele) => ele.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour },
	}); */
}

export async function createTour(req, res) {}

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
