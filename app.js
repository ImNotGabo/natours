const fs = require('node:fs');
const { writeFile } = require('node:fs/promises');
const express = require('express');
const e = require('express');

const app = express();

// Middleware
app.use(express.json());

/* app.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
	res.send('You can post to this endpoint...');
}); */

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tour-simple.json`)
);

const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: { tours },
	});
};

const getTour = (req, res) => {
	// console.log(req.params);
	const id = parseInt(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	const tour = tours.find((ele) => ele.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour },
	});
};

const createTour = async (req, res) => {
	try {
		// Basic body validation
		if (!req.body) {
			return res.status(400).json({
				status: 'fail',
				message: 'No data provided',
			});
		}

		const newId =
			tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
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
			error:
				process.env.NODE_ENV === 'development'
					? error.message
					: undefined,
		});
	}
};

const updateTour = (req, res) => {
	const id = parseInt(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>',
		},
	});
};

const deleteTour = (req, res) => {
	const id = parseInt(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	res.status(204).json({
		status: 'success',
		data: null,
	});
};

app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
	.route('api/v1/tours/:id')
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App runinng on ${port}...`);
});
