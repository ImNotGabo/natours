import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const BLACKLISTED_QUERIES = ['page', 'sort', 'limit', 'fields'];
export const USER = process.env.DB_USER;
export const PWD = process.env.DB_PASSWORD;

export const getDirname = (metaUrl) => {
	const __filename = fileURLToPath(metaUrl);
	return path.dirname(__filename);
};
