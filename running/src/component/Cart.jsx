import React, { Component } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


export default class Cart extends Component {

	promise = loadStripe("pk_test_51HL1OqENKFvZ9SFaQQVR6NKs2Rk2NkqKq2TJYwtUZDmD8qklZ1qBZuVfqg6OaqSPsaEK3bj1EzTOTWHSWYhYlbTy00SXjTC7NJ")

	state = {
		isCheckouted: false,
		// isPaid: false
	}

	isCheckouthandler = () => {
		this.setState((prev) => ({ isCheckouted: !prev.isCheckouted }))
	}

	isPaidHandler = (p) => {
		if (p) {
			this.props.submitCart(this.props.cart);
			// this.setState((prev) => ({ isPaid: p }))
		}

	}
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
					<Button onClick={this.isCheckouthandler}>Checkout Stripe</Button>
					{/* <Button onClick={() => this.submitCart(this.props.cart)}>Checkout</Button> */}
					{this.state.isCheckouted && <Elements stripe={this.promise}><CheckoutForm paidStatus={this.isPaidHandler} cart={this.props.cart} total=
						{totalPrice} paymentStatus={this.state.paymentStatus} /></Elements>}

				</Container>
			</div>
		);
	}
}
