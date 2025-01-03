import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from '../../models/toursModel.js';
import { PWD, USER } from '../../utils/utils.js';
import { readFile } from 'node:fs/promises';

dotenv.config({ path: '../../.env' });
const DB = process.env.DB_HOST.replace(/USER:PWD/, `${USER}:${PWD}`);
mongoose.connect(DB).then(() => {
	console.info('Connected to DB!');
});

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		const filePath = new URL(`./tour-simple.json`, import.meta.url);
		const tour = await readFile(filePath, { encoding: 'utf-8' });
		const tourData = JSON.parse(tour);

		if (!Array.isArray(tourData) || tourData.length === 0) {
			throw new Error('Invalid or empty JSON data');
		}
		await Tour.create(tourData);
		console.log('Data successfully imported!');
		process.exit(1);
	} catch (error) {
		console.error('Error importing data:', error.message);
	}
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log('Data successfully deleted');
		process.exit(1);
	} catch (error) {
		console.error(error);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
console.info(process.argv);
