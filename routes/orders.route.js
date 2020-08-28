const router = require('express').Router();
const Order = require('../models/order.model');

/* 
get all lists(from previous submitted carts) from orders from current user
*/
router.get('/', async (req, res) => {
	try {
		/* 
		looks into the collection for all orders with the user id
		if notthing matches, just return an emptpy array
        */
		let orders = await Order.find({
			createdBy : req.user._id
		}).populate('items.item');
		res.render('orders/index', { orders });
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
