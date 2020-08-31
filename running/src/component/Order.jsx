import React, { Component } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;
export default class Order extends Component {
	state = {
		// order : []
	};
	fetchItems = () => {
		let token = localStorage.getItem('token');
		Axios.get(`${URL}/order`, {
			// as we saved the token under the header
			headers : {
				'x-auth-token' : token
			}
		})
			.then((res) => {
				console.log(res.data);
				this.setState({ order: res.data.order });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		console.log(this.props.orders);
		return (
			<div>
				<h1>Orders</h1>
				<Container fluid>
					<Row>
						{this.props.orders.map((item) => (
							<Col key={item._id} md="3" className="mb-3">
								<Card>
									<Card.Img variant="top" src={item.picture} />
									<Card.Body>
										{item.name}
										<div>
											<Button onClick={this.deleteItem} variant="danger" id={item._id}>
												Delete
											</Button>
										</div>
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
