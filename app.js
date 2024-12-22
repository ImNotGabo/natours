const fs = require('node:fs');
const { writeFile } = require('node:fs/promises');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
	console.log('Hello from Middleware👋');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tour-simple.json`)
);

// Route handles

const getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined!',
	});
};

const createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined!',
	});
};

const getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined!',
	});
};
const updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined!',
	});
};
const deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not yet defined!',
	});
};

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App runinng on ${port}...`);
});
