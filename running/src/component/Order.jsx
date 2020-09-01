import React, { Component } from 'react';
import { Container, Row, Card, Col, Button, Table } from 'react-bootstrap';
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
					{/* items     : [
						{
							item     : {
								type : mongoose.Schema.Types.ObjectId,
								ref  : 'Item'
								name        : String,
								description : String,
								picture     : String,
								quantity    : Number,
								price       : Number
							},
							quantity : Number
						}
					], */}
					<Table>
						{/* {this.props.orders.map((order, index) => (
							<Row key={order._id} md="3" className="mb-3">
								<Card>
									<thead>
										<th>Order : {index + 1}</th>
										<tr>
											<th>Items</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<Card.Body>
										{order.items.forEach((item) => {
											<tr>
												<td>{item.item.name}</td>
												<td>{item.quantity}</td>
												<td>{item.item.price}</td>
											</tr>;
										})}
									</Card.Body>
								</Card>
							</Row>
						))} */}
					</Table>
					<Row />
				</Container>
			</div>
		);
	}
}
