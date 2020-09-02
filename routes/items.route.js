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
this route handles the form submission  from item/add route
*/
router.post('/add', async (req, res) => {
	//so that do not need to type req.body.name, req.body.price ...
	let { name, description, picture, quantity, price } = req.body;
	try {
		let item = new Item({
			name,
			description,
			picture,
			quantity,
			price
		});
		console.log(item);
		let savedItem = await item.save();
		if (savedItem) {
			res.status(201).json({ savedItem });
		}
	} catch (error) {
		console.log(error);
	}
});
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

		let order = await Order.find();
		//console.log(items);
		// res.render('items/index', { items });
		res.status(200).json({
			items,
			cart,
			order
		});
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
