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
	render() {
		console.log(this.props.cart);
		return (
			<div>
				<h1>Cart</h1>
				<Container fluid>
					<Row>
						{this.props.cart.map((item) => (
							<Col key={item._id} md="3" className="mb-3">
								<Card>
									<Card.Img variant="top" src={item.item.picture} />
									<Card.Body>
										<div>{item.item.name}</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</div>
		);
	}
}
