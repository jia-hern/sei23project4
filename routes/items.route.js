const router = require('express').Router();
const Item = require('../models/item.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
/*
 @route GET /api/items/
 @desc displays all items in the items collections
 @access public - made private because need the req.user.id
 */
router.get('/', async (req, res) => {
	try {
		// need to find all items to display, logged in or not
		let items = await Item.find();
		// only process the cart and Order if the user is logged in
		if (req.user.id) {
			let cart = await Cart.findOne({ createdBy: req.user.id });
			if (cart) {
				console.log("here got cart");
				await cart.populate("items.item").execPopulate();
				console.log(cart.items[0].name);
			}
			let total = 0;
			// if there are items in the cart then compute total
			if (cart) {
				cart.items.forEach((el) => {
					total += el.item.price * el.quantity;
				});
			}
			let orders = await Order.find({
				createdBy: req.user.id
			}).populate("items.item");
			console.log("===================================");
			console.log(orders);
			console.log("===================================");
			console.log("Total of cart is ", total)
			res.status(200).json({
				items,
				cart,
				total,
				orders
			});
		}
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
