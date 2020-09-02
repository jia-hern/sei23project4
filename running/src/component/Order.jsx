import React, { Component } from 'react';
import { Container, Row, Card, Table } from 'react-bootstrap';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;
export default class Order extends Component {
	state = {
		// order : []
	};
	// fetchItems = () => {
	// 	let token = localStorage.getItem('token');
	// 	Axios.get(`${URL}/order`, {
	// 		// as we saved the token under the header
	// 		headers : {
	// 			'x-auth-token' : token
	// 		}
	// 	})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			this.setState({ order: res.data.order });
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	componentDidMount() {
		//this.props.fetchItems();
	}
	render() {
		console.log('this is order.jsx', this.props.orders);
		return (
			<Container fluid>
				<h1>Orders</h1>
				<Table>
					{this.props.orders.map((order, index) => (
						<React.Fragment key={index}>
							<thead>
								<tr>
									<th>Order : {index + 1}</th>
								</tr>
								<tr>
									<th>Items</th>
									<th>Price</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>
								{
									order.items.map((item, index) => (
										<tr key={index}>
											<td>{item.item.name}</td>
											<td>{item.item.price}</td>
											<td>{item.quantity}</td>
										</tr>
									))
								}
							</tbody>
						</React.Fragment>
					))}
				</Table>
			</Container>
		);
	}
}
