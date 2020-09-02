import React, { Component } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';


export default class Cart extends Component {
	submitCart = (cart) => {
		this.props.submitCart(cart);
		console.log(cart);
	}
	componentDidMount() {
		this.props.fetchItems();
	}
	render() {
		console.log('this is cart.jsx', this.props.cart);
		let totalPrice;
		if (this.props.cart.items.length > 0) {
			totalPrice = this.props.cart.items
				.map(item => item.item.price * item.quantity)
				.reduce((a, b) => a + b);
		}

		return (
			<div>
				<h1>Cart</h1>
				<Container fluid>
					{this.props.cart.items.map((lineitem) => (
						<Row key={"item._id"} className="mb-3">
							<Card>
								<Card.Img variant="top" src={lineitem.item.picture} style={{ height: "50%", width: "50%" }} />
								<Card.Body>
									<div>
										<span> {lineitem.item.name}</span>
										<span>Price: {lineitem.item.price}</span>
										<span>Quantity: {lineitem.quantity}</span>
										<span>Total price: {lineitem.item.price * lineitem.quantity}</span>
									</div>
								</Card.Body>
							</Card>
						</Row>
					))}
					<h2>
						Total: {totalPrice || ""}
					</h2>
					{/* <div>Total: {total}</div> */}
					<Button onClick={() => this.submitCart(this.props.cart)}>Checkout</Button>
				</Container>
			</div>
		);
	}
}
