import React, { Component } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import Item from '../component/items/Item';

export default class Home extends Component {
	componentDidMount() {
		this.props.fetchItems();
	}
	render() {
		return (
			<div>
				<h1>Home</h1>
				<Container fluid>
					<Row>
						{this.props.items.map((item) => (
							<Col key={item._id} md="4" className="mb-3">
								<Card>
									<Card.Img variant="top" src={item.picture} alt={item.name} />
									<Card.Body>
										<div>
											<h2>{item.name}</h2>
											<div>Description: {item.description} </div>
											<div>Quantity: {item.quantity}</div>
											<div>Price: {item.price} </div>

											<Button
												className="d-flex justify-content-center align-self-center"
												onClick={() => this.props.addItem(item)}
												id={item._id}
											>
												Add to Cart
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
