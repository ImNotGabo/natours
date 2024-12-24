import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { getDirname } from '../utils.js';

const __dirname = getDirname(import.meta.url);

const tours = JSON.parse(
	readFileSync(`${__dirname}/../dev-data/data/tour-simple.json`)
);

export function checkID(req, res, next, value) {
	console.log(`ID is: ${value}`);
	const id = parseInt(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	next();
}

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
		results: tours.length,
		data: { tours },
	});
}

export function getTour(req, res) {
	const id = parseInt(req.params.id);
	const tour = tours.find((ele) => ele.id === id);
	res.status(200).json({
		status: 'success',
		data: { tour },
	});
}

export async function createTour(req, res) {
	try {
		// Basic body validation
		if (!req.body) {
			return res.status(400).json({
				status: 'fail',
				message: 'No data provided',
			});
		}
		await writeFile(
			`${__dirname}/../dev-data/data/tour-simple.json`,
			JSON.stringify(tours, null, 2) // JSON format
		);
		tours.push(newTour);

		await writeFile(
			`${__dirname}/../dev-data/data/tour-simple.json`,
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
