const fs = require('node:fs');
const express = require('express');

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

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'sucess',
		results: tours.length,
		data: { tours },
	});
});

app.post('/api/v1/tours', (req, res) => {
	// console.log(req.body);
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tour-simple.json`,
		JSON.stringify(tours),
		(err) => {
			console.error(err);
			res.status(201).json({
				status: 'sucess',
				data: {
					tour: newTour,
				},
			});
		}
	);
});

const port = 3000;
app.listen(port, () => {
	console.log(`App runinng on ${port}...`);
});
