const Item = require('../models/item.model');

require('../config/db');
let db = [
	{
		name: 'Veg',
		description: 'green',
		picture: 'https://vn-test-11.slatic.net/p/031dbea8b772b54ebaa077c0ac5648c0.jpg',
		quantity: 1,
		price: 2.0,
		category: 'Vegetable'
	},
	{
		name: 'Apple',
		description: 'red',
		picture: 'https://my-test-11.slatic.net/p/48977eba66358d5ab0c900fe8460a66d.jpg',
		quantity: 1,
		price: 2.5,
		category: 'Fruit'
	},
	{
		name: 'Orange',
		description: 'sweet',
		picture: 'https://my-test-11.slatic.net/p/37809e2652e1bed581f7bdc5348b4406.jpg',
		quantity: 5,
		price: 3.0,
		category: 'Fruit'
	}
];
Item.remove()
	.then((e) => {
		Item.create(db).then((item) => {
			console.log(`${item} entry complete`);
		});
	})
	.catch(() => {
		process.exit(1);
	});

// db.forEach((ele, i) => {
//   Author.create({ name: ele.author }).then((author) => {
//     let article = { name: ele.name, text: ele.text, author: author._id };
//     Article.create(article)
//       .then((e) => {
//         console.log(`${i} entry complete`);
//       })
//       .catch(() => {
//         process.exit(1);
//       });
//   });
// });

// node seeds/seed
