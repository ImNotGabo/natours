const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// Route handles

// Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App runinng on ${port}...`);
});
