const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name: String,
	description: String,
	picture: String,
	quantity: Number,
	price: Number,
	category: String
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
