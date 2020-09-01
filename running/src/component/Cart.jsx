import React, { Component } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;
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
		this.props.fetchItems();
	}
	render() {
		console.log('this is cart.jsx', this.props.cart);
		return (
			<div>
				<h1>Cart</h1>
				<Container fluid>
					{this.props.cart.map((item) => (
						<Row key={item._id} className="mb-3">
							<Card>
								<Card.Img variant="top" src={item.item.picture} />
								<Card.Body>
									<div>
										<span>{item.item.name}</span>
										<span>Price: {item.item.price}</span>
										<span>Quantity: {item.quantity}</span>
									</div>
								</Card.Body>
							</Card>
						</Row>
					))}
					<Button>Checkout</Button>
				</Container>
			</div>
		);
	}
}
