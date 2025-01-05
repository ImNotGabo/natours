import { fileURLToPath } from 'url';
import path from 'path';

export const getDirname = (metaUrl) => {
	const __filename = fileURLToPath(metaUrl);
	return path.dirname(__filename);
};
