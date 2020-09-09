import React, { Component } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Success from './Success'

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
	// submitCart = (cart) => {
	// 	this.props.submitCart(cart);
	// 	console.log(cart);
	// }
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
		// we can render the success component instead of the actual checkout if the paymentstatus is true 
		if (this.props.paymentStatus) {
			return <Success />
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
					<ol>
						<div>Test cases for card:</div>
						<li>Payment succeeds 4242 4242 4242 4242</li>
						<li>Payment requires authentication 4000 0025 0000 3155</li>
						<li>Payment is declined 4000 0000 0000 9995</li>
					</ol>

					{/* <Button onClick={() => this.submitCart(this.props.cart)}>Checkout</Button> */}
					{/* add in payment  */}
					{this.state.isCheckouted && <Elements stripe={this.promise}><CheckoutForm paidStatus={this.isPaidHandler} cart={this.props.cart} total=
						{totalPrice} paymentStatus={this.state.paymentStatus} /></Elements>}

				</Container>
			</div>
		);
	}
}
