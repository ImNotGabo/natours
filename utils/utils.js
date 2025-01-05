import dotenv from 'dotenv';
dotenv.config();

export const BLACKLISTED_QUERIES = ['page', 'sort', 'limit', 'fields'];
export const USER = process.env.DB_USER;
export const PWD = process.env.DB_PASSWORD;
