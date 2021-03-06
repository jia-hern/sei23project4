const router = require('express').Router();
const Order = require('../models/order.model');

/*
 @route GET /api/orders/
 @desc displays all orders(from previous submitted carts) in the orders collections
 @access private
 */
router.get('/', async (req, res) => {
	try {
		/* looks into the collection for all orders with the user id
		if notthing matches, just return an emptpy array */
		let orders = await Order.find({
			createdBy: req.user._id
		}).populate('items.item');

		res.status(200).send({ orders });
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
