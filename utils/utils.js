import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const getDirname = (metaUrl) => {
	const __filename = fileURLToPath(metaUrl);
	return path.dirname(__filename);
};

export const USER = process.env.DB_USER;
export const PWD = process.env.DB_PASSWORD;
