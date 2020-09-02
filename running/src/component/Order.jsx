import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';

export default class Order extends Component {
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
