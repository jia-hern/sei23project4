import React, { Component } from 'react';
import { Row, Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

const URL = process.env.REACT_APP_URL;
export default class Register extends Component {
	state = {
		firstname : '',
		lastname  : '',
		age       : '',
		address   : '',
		phone     : '',
		password  : ''
	};
	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	registerHandler = () => {
		//login here
		this.props.register(this.state);
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<div>
					<Container>
						<Row>
							<Form.Control
								name="firstname"
								type="firstname"
								placeholder="firstname"
								onChange={this.changeHandler}
							/>
						</Row>
						<Row>
							<Form.Control
								name="lastname"
								type="lastname"
								placeholder="lastname"
								onChange={this.changeHandler}
							/>
						</Row>
						<Row>
							<Form.Control name="age" type="age" placeholder="age" onChange={this.changeHandler} />
						</Row>
						<Row>
							<Form.Control
								name="address"
								type="address"
								placeholder="address"
								onChange={this.changeHandler}
							/>
						</Row>
						<Row>
							<Form.Control name="phone" type="phone" placeholder="phone" onChange={this.changeHandler} />
						</Row>
						<Row>
							<Form.Control
								name="password"
								type="password"
								placeholder="password"
								onChange={this.changeHandler}
							/>
						</Row>
						<Button variant="primary" block onClick={this.registerHandler}>
							Register
						</Button>
					</Container>
				</div>
			</div>
		);
	}
}
