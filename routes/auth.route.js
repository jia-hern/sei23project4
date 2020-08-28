const router = require('express').Router();
const passport = require('../config/passportConfig');
const isLoggedIn = require('../config/loginBlocker');
const User = require('../models/user.model');

router.get('/auth/signup', (request, response) => {
	response.render('auth/signup');
});

router.post('/auth/signup', (request, response) => {
	let user = new User(request.body);

	console.log(user);
	user
		.save()
		.then(() => {
			passport.authenticate('local', {
				successRedirect : '/', //after login success
				successFlash    : 'You have logged In!'
			})(request, response);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/auth/signin', (request, response) => {
	response.render('auth/signin');
});

// Login Route
router.post('/auth/signin', function(req, res, next) {
	//using passport as part of the code instead of middleware( using the code prewritten as it is)
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/auth/signin');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			res.cookie('role', user.isSeller, { maxAge: 36000 });
			return res.redirect('/');
		});
	})(req, res, next);
});

//--- Logout Route
router.get('/auth/logout', (request, response) => {
	request.logout(); //clear and break session
	request.flash('success', 'Have a pleasant day!');
	response.redirect('/auth/signin');
});

module.exports = router;
