const router = require('express').Router();
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const { exists } = require('../models/cart.model');

/* get all items from cart from current user */
router.get('/', async (req, res) => {
	console.log(req.user);
	try {
		if (!req.user) {
			return res.render('cart/index', { items: [] });
		} else {
			//compares to check that all the items that is created by this user
			let items = await Cart.findOne({ createdBy: req.user._id }).populate('items.item');
			// console.log(items);
			let total = 0;
			// if there are items in the cart then compute total
			if (items) {
				items.items.forEach((el) => {
					total += el.item.price * el.quantity;
				});
			}
			// console.log(total);
			if (items) {
				/* if there are items in the cart display that */
				res.render('cart/index', { items: items['items'], total });
			} else {
				/* return an empty array if there is nothing */
				res.render('cart/index', { items: [], total });
			}
		}
	} catch (error) {
		console.log(error);
	}
});

router.post('/:id/add', async (req, res) => {
	console.log(req.user);
	/* 
    
    */
	try {
		/* 
       check if the cart has a createdBy same as the login user
        */
		let checkedCart = await Cart.exists({
			createdBy : req.user._id
		});
		console.log(checkedCart);
		/* 
        check if the user already has an existing cart
        */
		if (checkedCart) {
			/* 
        looks into the collection for the cart with the user id
        */
			let cart = await Cart.findOne({
				createdBy : req.user._id
			});
			/* 
        Push the new item into the existing cart
        */
			if (cart.items) {
				//need to check if item has existed -> if  yes then* change number
				// instead of addibg new item
				// let existingCartwithItem = Cart.find({ 'items.item': req.params.cart_id, createdBy: req.user._id });
				// console.log('This is exisiting cart with item:', existingCartwithItem)

				//find index of item in cart
				// if found return index else return - 1
				let itemIndex = cart.items.findIndex((element) => {
					return element.item.equals(req.params.id);
				});

				console.log('Item index is : ', itemIndex);
				//this will show on node terminal

				// oh for things in route we cannont console log in chrome
				//if index is found and not -1 update quantity
				if (itemIndex > -1) {
					cart.items[itemIndex].quantity += 1;
				} else {
					//else just add new item to cart
					cart.items.push({
						item     : req.params.id,
						quantity : 1
					});
				}
				// let totalPrice = 0;
				// for (i = 0; i < items.length; i++) {
				// 	totalPrice += cart.items[i].price * cart.items[i].quantity;
				// }
			}

			/*
        Save changes to existing cart
        */
			let savedCart = await cart.save();
			if (savedCart) {
				res.redirect('/');
				console.log('The cart contains: ', savedCart);
			}
		} else {
			/* 
        create a new cart
        */
			let thing = {
				items     : [
					{
						item     : req.params.id,
						quantity : 1
					}
				],
				createdBy : req.user._id
			};
			let cart = new Cart(thing);
			let savedCart = await cart.save();
			if (savedCart) {
				res.redirect('/');
			}
		}
	} catch (error) {
		console.log(error);
	}
});
router.post('/checkout', async (req, res) => {
	console.log('something');
	try {
		/* first is to check in the cart for the current login user
	next create a new order with info i got from the cart
	need to remove the _id from the cart -> make a new obj and just copy items:[] and createdBy
	and then delete the cart
	*/

		//check if cart is there(returns T/F)
		let checkedCart = await Cart.exists({
			createdBy : req.user._id
		});
		console.log(checkedCart);
		if (checkedCart) {
			let cart = await Cart.findOne({
				createdBy : req.user._id
			});
			console.log('cart', cart);
			let newOrder = { items: cart.items, createdBy: cart.createdBy };
			let order = new Order(newOrder);
			let savedOrder = await order.save();
			if (savedOrder) {
				let cartToDelete = await Cart.findByIdAndDelete(cart._id);
				res.redirect('/');
			}
		}
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
