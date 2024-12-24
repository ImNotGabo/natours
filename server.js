import 'dotenv/config';
import app from './app.js';

// Start the server
// console.log(process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
