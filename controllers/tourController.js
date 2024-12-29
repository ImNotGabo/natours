import Tour from '../models/toursModel.js';

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

export async function createTour(req, res) {
	try {
		const newTour = await Tour.create(req.body).then();
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
