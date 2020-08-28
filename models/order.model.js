const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema(
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
