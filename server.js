import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const user = process.env.DB_USER;
const pwd = process.env.DB_PASSWORD;

const DB = process.env.DB_HOST.replace(/USER:PWD/, `${user}:${pwd}`);
mongoose.connect(DB).then(console.log('Connected!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (con) => {
	console.log(`Server is running on port ${PORT}`);
});
