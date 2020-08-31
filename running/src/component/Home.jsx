import React, { Component } from 'react';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
// import Item from '../component/items/Item';

const URL = process.env.REACT_APP_URL;
export default class Home extends Component {
	state = {
		items : []
	};
	fetchItems = () => {
		let token = localStorage.getItem('token');
		Axios.get(`${URL}/items`, {
			// as we saved the token under the header
			headers : {
				'x-auth-token' : token
			}
		})
			.then((res) => {
				// console.log(res.data);
				this.setState({ items: res.data.items });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	deleteItem = (e) => {
		console.log(e.target.id);
		Axios.delete(`${URL}/items/${e.target.id}`).then((res) => {
			this.fetchItems();
		});
	};
	// console.log(this.props.items);
	componentDidMount() {
		this.fetchItems();
	}
	render() {
		return (
			<div>
				<h1>Home</h1>
				<Container fluid>
					<Row>
						{this.state.items.map((item) => (
							<Col key={item._id} md="3" className="mb-3">
								<Card>
									<Card.Img variant="top" src={item.picture} />
									<Card.Body>
										{item.name}
										<div>
											<Button onClick={this.deleteItem} variant="danger" id={item._id}>
												Delete
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
