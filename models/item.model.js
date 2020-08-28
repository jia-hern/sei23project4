const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name        : String,
	description : String,
	quantity    : Number,
	price       : Number
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
