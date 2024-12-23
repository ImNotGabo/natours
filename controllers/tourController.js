const fs = require('node:fs');
const { writeFile } = require('node:fs/promises');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tour-simple.json`)
);

exports.checkID = (req, res, next, value) => {
	console.log(`ID is: ${value}`);
	const id = parseInt(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	next();
};

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: tours.length,
		data: { tours },
	});
};

exports.getTour = (req, res) => {
	const id = parseInt(req.params.id);
	const tour = tours.find((ele) => ele.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour },
	});
};

exports.createTour = async (req, res) => {
	try {
		// Basic body validation
		if (!req.body) {
			return res.status(400).json({
				status: 'fail',
				message: 'No data provided',
			});
		}

		const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
		const newTour = { id: newId, ...req.body };

		tours.push(newTour);

		await writeFile(
			`${__dirname}/dev-data/data/tour-simple.json`,
			JSON.stringify(tours, null, 2) //JSON formant
		);

		return res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			message: 'Error to save tour',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		});
	}
};

exports.updateTour = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>',
		},
	});
};

exports.deleteTour = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};
