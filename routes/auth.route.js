const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkToken = require('../config/config');
/*
 @route GET api/auth/register
 @desc register user
 @access public
 */
// router.post('/register', async (req, res) => {
router.post('/auth/register', async (req, res) => {
	let { firstname, lastname, age, address, phone, password } = req.body;
	console.log(req.body);
	try {
		console.log(req.body);
		let user = new User({ firstname, lastname, age, address, phone });
		// has password with 10 salt rounds before saving
		let hashPassword = await bcrypt.hash(password, 10);
		user.password = hashPassword;
		//save user
		await user.save();
		//set 201 as status as it was succes and new data was added
		// res.status(201).json({ messsage: 'user registered successfully!' });
		const payload = {
			//create a token
			user : {
				id : user._id
			}
		};
		console.log(payload);
		jwt.sign(payload, 'registertoken', { expiresIn: 36000000 }, (err, token) => {
			if (err) throw err; //same as saying if error, go to catch
			res.status(200).json({ token });
		});
	} catch (error) {
		console.log(error);
		// 500 is internal server error
		res.status(500).json({ messsage: 'oh no!!! user was not registered' });
	}
});
/*
 @route GET api/auth/login
 @desc login user
 @access public
 */
// router.post('/login', async (req, res) => {
router.post('/auth/login', async (req, res) => {
	let { phone, password } = req.body;
	// console.log(req.body);
	try {
		let user = await User.findOne({ phone });
		if (!user) {
			return res.status(400).json({ messsage: 'user not found!' });
		}
		//compare keyed in password with password in db
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ messsage: 'Aiyo!! you tryna hack me wah?' });
		}
		const payload = {
			//    send this back to user
			// dont send sensitive info here
			user : {
				id : user._id
			}
		};
		jwt.sign(payload, 'seifewdaystogo', { expiresIn: 36000000 }, (err, token) => {
			if (err) throw err; //same as saying if error, go to catch
			res.status(200).json({ token });
			console.log(token);
		});
	} catch (error) {
		res.status(500).json({ message: 'hmm... dunno what happended man!' });
	}
});
// router.get('/user', checkToken, async (req, res) => {
router.get('/auth/user', checkToken, async (req, res) => {
	try {
		let user = await User.findById(req.user.id, '-password');
		res.status(200).json({
			user
		});
	} catch (error) {
		res.status(500).json({
			message : 'something is wrong!'
		});
	}
});

//--- Logout Route
router.get('/auth/logout', (request, response) => {
	request.logout(); //clear and break session
	request.flash('success', 'Have a pleasant day!');
	response.redirect('/auth/signin');
});

module.exports = router;
