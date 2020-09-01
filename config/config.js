//to lock the routes, so that only the user is logged in can access
const jwt = require('jsonwebtoken');
//to be used in auth.route.js

//next just means continue
module.exports = (req, res, next) => {
	//want tthe user to hide the token in the header instead of showing it in the url
	const token = req.header('x-auth-token');
	console.log('token : ', token);
	if (!token) {
		//401 means not authorized to access
		return res.status(401).json({
			message : 'are you a thief???'
		});
	}
	try {
		const decoded = jwt.verify(token, 'seifewdaystogo');
		// word after decoded. has to match whats in payload
		// const payload = {
		// 	user : {
		// 		id : user._id
		// 	}
		// };
		req.user = decoded.user;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			message : 'token is not valid!'
		});
	}
};
