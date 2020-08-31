require('dotenv').config();

const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect(
	process.env.MONGODB, // go to .env to get the MONGODB
	{
		useCreateIndex     : true,
		useNewUrlParser    : true,
		useUnifiedTopology : true
	},
	(err) => {
		if (err) throw err; // if there are err display error
		console.log('mongodb connected!'); //say tat mongodb is connected if no err
	}
);

module.exports = mongoose;
