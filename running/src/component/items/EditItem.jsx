import React, { Component } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
// import Axios from 'axios';
// const URL = process.env.REACT_APP_URL;

export default class EditItem extends Component {
	state = {
		name        : this.props.item.name,
		description : this.props.item.description,
		picture     : this.props.item.picture,
		quantity    : this.props.item.quantity,
		price       : this.props.item.price
	};
	changeHandler = (e) => {
		//allow a re render in item.jsx
		// can pass the state[...] where ... can either be name,picture or text
		this.setState({ [e.target.name]: e.target.value });
	};
	submitHandler = () => {
		console.log(this.state);
		this.props.editItem(this.state, this.props.item._id);
	};

	render() {
		let { name, picture, description, quantity, price } = this.state;
		console.log(this.props);
		return (
			<div>
				<h1>Edit Items</h1>
				<div>
					<Row>
						<Form.Control name="name" value={name} onChange={this.changeHandler} />
					</Row>
					<Row>
						<Form.Control name="description" value={description} onChange={this.changeHandler} />
					</Row>
					<Row>
						<Form.Control name="picture" value={picture} onChange={this.changeHandler} />
					</Row>
					<Row>
						<Form.Control name="quantity" value={quantity} onChange={this.changeHandler} />
					</Row>
					<Row>
						<Form.Control name="price" value={price} onChange={this.changeHandler} />
					</Row>
					<Button onClick={this.submitHandler}>Submit</Button>
				</div>
			</div>
		);
	}
}
