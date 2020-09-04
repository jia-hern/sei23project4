const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('./config/passportConfig');
// const expressLayouts = require('express-ejs-layouts');
// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);


const checkUser = require('./config/config');

//to call my mongoose connections
require('./config/db');

// mongoose.Promise = Promise;
// mongoose
// 	.connect(
// 		process.env.MONGODB,
// 		// process.env.MONGOLIVE,
// 		{
// 			useNewUrlParser    : true,
// 			useUnifiedTopology : true,
// 			useCreateIndex     : true
// 		}
// 	)
// 	.then(() => {
// 		console.log('mongodb is running!');
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

app.use(express.static('public'));
//to receive form data
app.use(express.urlencoded({ extended: true }));
//to receive json data
app.use(express.json());
// app.set('view engine', 'ejs');
// app.use(expressLayouts);

// app.use(cookieParser());

// app.use(
// 	session({
// 		secret            : process.env.SECRET,
// 		saveUninitialized : true,
// 		resave            : false,
// 		cookie            : { maxAge: 360000 },
// 		store             : new MongoStore({ url: process.env.MONGOLIVE })
// 		// store             : new MongoStore({ url: process.env.MONGODB })
// 	})
// );
//-- passport initialization
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// app.use(function(request, response, next) {
// response.locals.alerts = request.flash();
// response.locals.currentUser = request.user;
// next();
// });
app.use(cors()); //allows all requests from outside servers or apps

app.use('/api/items', checkUser, require('./routes/items.route'));
// app.use('/cart', require('./routes/cart.route'));
app.use('/api/cart', checkUser, require('./routes/cart.route'));
app.use('/api/orders', checkUser, require('./routes/orders.route'));
// app.use('/orders', checkUser, require('./routes/orders.route'));
app.use('/api', require('./routes/auth.route'));

app.get('/api', (req, res) => {
	res.send("here working!")
});


//can go to localhost:5000 to see it in deployment! (after running npm start in root folder)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('running/build'));
	app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'running', 'build', 'index.html')));
}
app.listen(process.env.PORT, () => {
	console.log(`running on PORT ${process.env.PORT}`);
});
