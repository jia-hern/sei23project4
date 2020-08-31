import React, { Component } from 'react';
import { Row, Container, Form, Button } from 'react-bootstrap';

// const URL = process.env.REACT_APP_URL;
export default class Login extends Component {
	state = {
		phone    : '',
		password : ''
	};
	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	loginHandler = () => {
		//login here
		this.props.login(this.state);
	};
	render() {
		return (
			<div>
				<h1>Login</h1>
				<div>
					<Container>
						<Row>
							<Form.Control
								name="phone"
								placeholder="Phone Number"
								type="phone"
								onChange={this.changeHandler}
							/>
						</Row>
						<Row>
							<Form.Control
								name="password"
								placeholder="password"
								type="password"
								onChange={this.changeHandler}
							/>
						</Row>
						<Button variant="primary" block onClick={this.loginHandler}>
							Login
						</Button>
					</Container>
				</div>
			</div>
		);
	}
}
