const router = require('express').Router();
const Item = require('../models/item.model');
/* 
this route displays a form for adding a new item
*/
router.get('/new', (req, res) => {
	res.render('items/new');
});
/* 
this route handles the form submission  from item/new route
*/
router.post('/new', async (req, res) => {
	//so that do not need to type req.body.name, req.body.price ...
	let { name, description, quantity, price } = req.body;
	try {
		let item = new Item({
			name,
			description,
			quantity,
			price
		});
		console.log(item);
		let savedItem = await item.save();
		if (savedItem) {
			res.redirect('/items');
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
		console.log(items);
		res.render('items/index', { items });
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
