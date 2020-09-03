const router = require('express').Router();
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Item = require('../models/item.model');
const { exists } = require('../models/cart.model');


const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(STRIPE_SECRET_KEY);
// console.log(stripe)

//for stripe
const calculateCartAmount = 0
// const calculateOrderAmount = async (items) => {
// 	// Replace this constant with a calculation of the order's amount
// 	// Calculate the order total on the server to prevent
// 	// people from directly manipulating the amount on the client
// 	await savedOrder.populate("items.item").execPopulate();
// 	return (
// 		savedOrder.items
// 			.map(item => (item.item.price * item.quantity))
// 			.reduce((a, b) => (a + b))
// 	);
// };

/* get all items from cart from current user */
router.post('/:id/add', async (req, res) => {
	console.log("logged in user========================")
	console.log(req.user);
	/* 
    
    */
	try {
		/* 
       check if the cart has a createdBy same as the login user
        */
		let checkedCart = await Cart.exists({
			createdBy: req.user.id
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
				createdBy: req.user.id
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
				let item = await Item.findOne({ _id: req.params.id });
				// oh for things in route we cannont console log in chrome
				//if index is found and not -1 update quantity
				if (itemIndex > -1) {
					cart.items[itemIndex].quantity += 1;
				} else {
					//else just add new item to cart
					cart.items.push({
						item,
						quantity: 1
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
				let finalCart = await Cart.findOne({
					createdBy: req.user.id
				}).populate('items.item');
				console.log('The cart contains: ', savedCart);
				res.status(201).json({ message: 'added to cart', cart: finalCart });
			}
		} else {
			/* 
        create a new cart
        */
			let item = await Item.findOne({ _id: req.params.id });
			console.log("ITEM TO ADD TO CART");
			console.log(item);
			let thing = {
				items: [
					{
						item,
						quantity: 1
					}
				],
				createdBy: req.user.id
			};
			console.log(thing);
			let cart = new Cart(thing);
			cart.populate('items.item');
			let savedCart = await cart.save();
			console.log(savedCart);
			if (savedCart) {
				let finalCart = await Cart.findOne({
					createdBy: req.user.id
				}).populate('items.item');
				res.status(201).json({ message: 'added to cart', cart: finalCart });
			}
			//calculate the total in cart
			calculateCartAmount = finalCart.items
				.map(item => (item.item.price * item.quantity))
				.reduce((a, b) => (a + b))
		}
	} catch (error) {
		console.log(error);
	}
});

router.post('/checkout', async (req, res) => {
	try {
		/* first is to check in the cart for the current login user
	next create a new order with info i got from the cart
	need to remove the _id from the cart -> make a new obj and just copy items:[] and createdBy
	and then delete the cart
	*/

		//check if cart is there(returns T/F)
		let checkedCart = await Cart.exists({
			createdBy: req.user.id
		});
		console.log(checkedCart);
		if (checkedCart) {
			let cart = await Cart.findOne({
				createdBy: req.user.id
			});
			console.log('cart', cart);
			// assign a variable to the total and calculate it here
			let newOrder = { items: cart.items, createdBy: cart.createdBy };
			let order = new Order(newOrder);
			let savedOrder = await order.save();
			if (savedOrder) {
				await savedOrder.populate("items.item").execPopulate();
				console.log(savedOrder);
				let cartToDelete = await Cart.findByIdAndDelete(cart._id);
				// res.redirect('/');
				res.status(201).json({ message: 'cart has been shifted to order', order: savedOrder });
			}


		}
	} catch (error) {
		console.log(error);
	}
});
router.post("/create-payment-intent", async (req, res) => {
	console.log("Reached the stripe payment")
	const { items, total } = req.body;
	try {
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: parseFloat(total * 10),
			currency: "usd"
		});
		console.log("i am here")
		res.send({
			clientSecret: paymentIntent.client_secret
		});


	} catch (error) {
		console.log(error)
	}
});

/* tabulate total price of cart */
// router.get('/', async (req, res) => {
// 	try {
// 		let cart = await Cart.findOne({ createdBy: req.user.id });
// 		if (cart) {
// 			await cart.populate("items.item").execPopulate();
// 		}
// 		let total = 0;
// 		// if there are items in the cart then compute total
// 		if (cart) {
// 			cart.items.forEach((el) => {
// 				total += el.item.price * el.quantity;
// 			});
// 		}
// 		console.log("Total of cart in cart.jsx is ", total)
// 		res.status(200).json({
// 			total,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// })
module.exports = router;
