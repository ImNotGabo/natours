const dotenv = require('dotenv').config({ path: './.env' });
const app = require('./app');

// Start the server
// console.log(process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
