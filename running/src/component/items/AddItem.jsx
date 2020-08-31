import React, { Component } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import Axios from 'axios';
//  allow us to redirect to another page
import { Redirect } from 'react-router-dom';
const URL = process.env.REACT_APP_URL;

class AddItem extends Component {
	state = {
		name        : '',
		description : '',
		picture     : '',
		quantity    : '',
		price       : '',
		status      : false
	};
	changeHandler = (e) => {
		//tale the name of the input field and give this value
		this.setState({ [e.target.name]: e.target.value });
		//e.target.value

		//e.target.name
	};
	submitHandler = () => {
		console.log(this.state);
		Axios.post(`${URL}/items`, this.state)
			.then((res) => {
				console.log('done');
				// this.props.history.push('/');
				this.setState({ status: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		let { name, description, picture, quantity, price } = this.state;
		if (this.state.status) {
			// everytime the status to set to true, will redirect to homepage
			return <Redirect to="/" />;
		}
		return (
			<div>
				<h1>Add Item</h1>
				<div>
					<Row>
						<Form.Control name="name" placeholder="name" value={name} onChange={this.changeHandler} />
					</Row>
					<Row>
						<Form.Control
							name="description"
							placeholder="description"
							value={description}
							onChange={this.changeHandler}
						/>
					</Row>
					<Row>
						<Form.Control
							name="picture"
							placeholder="picture"
							value={picture}
							onChange={this.changeHandler}
						/>
					</Row>
					<Row>
						<Form.Control
							name="quantity"
							placeholder="quantity"
							value={quantity}
							onChange={this.changeHandler}
						/>
					</Row>
					<Row>
						<Form.Control name="price" placeholder="price" value={price} onChange={this.changeHandler} />
					</Row>
					<Button onClick={this.submitHandler}>Submit</Button>
				</div>
			</div>
		);
	}
}

// export default withRouter(AddItem);
export default AddItem;
