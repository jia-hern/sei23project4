import React, { Component } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

export default class Cart extends Component {
	state = {
		// cart : []
	};
	// fetchCartItems = () => {
	// 	let token = localStorage.getItem('token');
	// 	Axios.get(`${URL}/cart`, {
	// 		// as we saved the token under the header
	// 		headers : {
	// 			'x-auth-token' : token
	// 		}
	// 	})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			this.setState({ cart: res.data.cart });
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	componentDidMount() {
		//this.props.fetchItems();
	}
	render() {
		console.log('this is cart.jsx', this.props.cart);
		return (
			<div>
				<h1>Cart</h1>
				<Container fluid>
					{this.props.cart.items.map((lineitem) => (
						<Row key={"item._id"} className="mb-3">
							<Card>
								<Card.Img variant="top" src={lineitem.item.picture} />
								<Card.Body>
									<div>
										<span> {lineitem.item.name}</span>
										<span>Price: {lineitem.item.price}</span>
										<span>Quantity: {lineitem.quantity}</span>
									</div>
								</Card.Body>
							</Card>
						</Row>
					))}
					<Button onClick={() => this.props.submitCart(this.props.cart)}>Checkout</Button>
				</Container>
			</div>
		);
	}
}
