const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema(
	{
		items     : [
			{
				item     : {
					type : mongoose.Schema.Types.ObjectId,
					ref  : 'Item'
				},
				quantity : Number
			}
		],

		createdBy : {
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'User'
		}
	},
	{ timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
