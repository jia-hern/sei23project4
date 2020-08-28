const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	firstname : {
		type     : String,
		required : true
	},
	lastname  : {
		type     : String,
		required : true
	},
	age       : {
		type     : String,
		required : true
	},
	address   : String,
	isShopper : {
		type    : Boolean,
		default : true
	},
	isAdmin   : {
		type    : Boolean,
		default : false
	},
	order     : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'Order'
		}
	],
	phone     : {
		type     : String,
		required : true
	},
	password  : {
		type     : String,
		required : true
	}
});

userSchema.pre('save', function(next) {
	var user = this;
	// Only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	//hash the password
	var hash = bcrypt.hashSync(user.password, 10);

	// Override the cleartext password with the hashed one
	user.password = hash;
	next();
});

userSchema.methods.validPassword = function(password) {
	// Compare is a bcrypt method that will return a boolean,
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
