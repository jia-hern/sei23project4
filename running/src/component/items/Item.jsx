import React, { Component } from 'react';
import Axios from 'axios';
import EditItem from './EditItem';
import { Container, Button } from 'react-bootstrap';
const URL = process.env.REACT_APP_URL;

export default class Item extends Component {
	state = {
		item : null,
		edit : false
	};
	showEdit = () => {
		this.setState((prevState) => ({ edit: !prevState.edit }));
	};
	editItems = (obj, id) => {
		Axios.put(`${URL}/items/${id}`, obj)
			.then((res) => {
				// console.log("done");
				//call method to call a re render
				this.getItem();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getItem = () => {
		Axios.get(`${URL}/items/${this.props.match.params.id}`)
			.then((res) => {
				console.log(res.data);
				this.setState({ item: res.data.item });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	componentDidMount() {
		this.getItem();
	}

	render() {
		console.log(this.props);
		console.log(this.props.match.params.id);
		let { item, edit } = this.state;
		return (
			<Container>
				<h1>Single Item</h1>
				{item ? (
					<div>
						{item.name}
						<div>Description: {item.description} </div>
						<div>
							<img src={item.picture} width="400" />
						</div>
						<div>
							Price: {item.price}Quantity: {item.quantity}
						</div>
						<Button onClick={this.showEdit}>Edit Item</Button>
						{edit && <EditItem item={item} editItem={this.editItems} />}
					</div>
				) : (
					'ho liao buey!'
				)}
			</Container>
		);
	}
}
