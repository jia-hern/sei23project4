const router = require('express').Router();
const Item = require('../models/item.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
/* replace with react
this route displays a form for adding a new item
*/
// router.get('/new', (req, res) => {
// 	res.render('items/new');
// });

/* 
this goes through all the items in the items 
collection and prints it out on /items
*/
router.get('/', async (req, res) => {
	try {
		let items = await Item.find();
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

		let orders = await Order.find().populate("items.item");
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
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
