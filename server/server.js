import mongoose from 'mongoose';
import app from '../app.js';
import { PWD, USER } from '../utils/utils.js';

const DB = process.env.DB_HOST.replace(/USER:PWD/, `${USER}:${PWD}`);
mongoose.connect(DB).then(console.log('Connected!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
