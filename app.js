const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/passportConfig');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const checkUser = require('./config/loginBlocker');

mongoose.Promise = Promise;
mongoose
	.connect(
		// process.env.MONGODB,
		process.env.MONGOLIVE,
		{
			useNewUrlParser    : true,
			useUnifiedTopology : true,
			useCreateIndex     : true
		}
	)
	.then(() => {
		console.log('mongodb is running!');
	})
	.catch((e) => {
		console.log(e);
	});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(cookieParser());

app.use(
	session({
		secret            : process.env.SECRET,
		saveUninitialized : true,
		resave            : false,
		cookie            : { maxAge: 360000 },
		store             : new MongoStore({ url: process.env.MONGOLIVE })
		// store             : new MongoStore({ url: process.env.MONGODB })
	})
);
//-- passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(request, response, next) {
	response.locals.alerts = request.flash();
	response.locals.currentUser = request.user;
	next();
});

app.use('/items', require('./routes/items.route'));
app.use('/cart', checkUser, require('./routes/cart.route'));
app.use('/orders', checkUser, require('./routes/orders.route'));
app.use('/', require('./routes/auth.route'));
app.get('/', (req, res) => {
	res.redirect('/items');
});
app.listen(process.env.PORT, () => {
	console.log(`running on PORT ${process.env.PORT}`);
});
