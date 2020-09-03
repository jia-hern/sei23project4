import React, { Component } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import Item from '../component/items/Item';

export default class Home extends Component {
	// state = {
	// 	 filtered: [],
	// 	category: '',
	// };
	// setFilterCategory = (filter) => {
	// 	e.preventDefault();
	// 	console.log('filtered based on the category:', filter);
	// 	this.setState({
	// 		category: e.target.value
	// 	});
	// };
	// filterBasedOnCategory = () => {
	// 	const regex = this.state.category.toLowerCase();
	// 	let filtered = this.props.items.filter(item => {
	// 		return item.category.toLowerCase().match(regex, 'g')
	// 	}) 
	//	this.setState({ filtered })
	// }
	componentDidMount() {
		this.props.fetchItems();
	}
	render() {
		return (
			<div>
				<Row>
					<h1>Home</h1>
					<Button className="m-3" onClick={() => this.setFilterCategory('Vegetable')}>Vegetable</Button>
					<Button className="m-3" onClick={() => this.setFilterCategory('Fruit')}>Fruit</Button>
				</Row>

				<Container fluid>
					<Row>
						{this.props.items.map((item) => (
							// {this.state.filtered.map((item) => (
							// if (this.state.category == item.category){
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
							// }
						))}
					</Row>
				</Container>
			</div>
		);
	}
}
