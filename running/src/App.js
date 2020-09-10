import React, { Component } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { decode } from 'jsonwebtoken';
import { Alert } from 'react-bootstrap';

import Navigation from './component/Navigation';
import Home from './component/Home';
import Cart from './component/Cart';
import Order from './component/Order';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
// import Success from './component/Success';
// import CheckoutForm from './component/CheckoutForm';


const URL = process.env.REACT_APP_URL;
class App extends Component {
	mounted = true;
	state = {
		items: [],
		cart: {
			items: []
		},
		paymentStatus: false,
		orders: [],
		errorMessage: null,
		isAuth: false,
		user: null
	};

	logoutHandeler = (e) => {
		e.preventDefault();
		console.log('i logged out');
		this.setState({
			items: [],
			cart: { items: [] },
			orders: [],
			errorMessage: null,
			isAuth: false,
			user: null
		});
		localStorage.removeItem('token');
	};

	getUserProfile = (token) => {
		Axios.get(`${URL}/auth/user`, {
			headers: {
				'x-auth-token': token
			}
		})
			.then((res) => {
				console.log('from user data: ', res.data);
				this.setState({
					isAuth: true,
					user: res.data.user
				});
			})
			.catch((err) => {
				console.log(err);
				// for safety, setAuth to false
				// this.setState({ isAuth: false, errorMessage: err.response.data.message });
			});
	};
	loginHandler = (credentials) => {
		console.log(credentials);
		//login here
		Axios.post(`${URL}/auth/login`, credentials)
			.then((res) => {
				console.log('Logged in');
				console.log(res.data);

				// take local storage and save the token
				localStorage.setItem('token', res.data.token);
				//get uptodate user information
				this.getUserProfile(res.data.token);
			})
			.catch((err) => {
				console.log('not Logged in');
				console.log(err.response.data);
				console.log(err);
				// for safety, setAuth to false
				this.setState({ isAuth: false, errorMessage: err.response.data.message });
			});
	};
	registerHandler = (credentials) => {
		//Register here
		console.log(credentials);
		Axios.post(`${URL}/auth/register`, credentials)
			.then((res) => {
				console.log(res.data);

				localStorage.setItem('token', res.data.token);
				this.setState({
					isAuth: true
				});
			})
			.catch((err) => {
				console.log(err);
				console.log(err.res);
				this.setState({
					isAuth: false
				});
			});
	};
	addItem = (item) => {
		let token = localStorage.getItem('token');
		if (token) {
			Axios.post(
				`${URL}/cart/${item._id}/add`,
				{},
				{
					headers: {
						'x-auth-token': token
					}
				}
			)
				.then((res) => {
					console.log('response: ', res);
					// let tempState = { ...this.state }; //copy of state
					// tempState.cart = res.data.cart;
					// console.log('temp cart', tempState);
					// this.state.cart.push(item);
					//set state
					this.setState({ cart: res.data.cart });
				})
				.catch((err) => {
					// console.log(err.response.data);
					console.log(err);
				});
		} else {
			console.log('no token added');
		}
	};

	fetchItems = () => {
		let token = localStorage.getItem('token');
		//if user is logged in, use the token to set states of items,cart and orders
		if (token) {
			Axios.get(`${URL}/items`, {
				// as we saved the token under the header
				headers: {
					'x-auth-token': token
				}
			})
				.then((res) => {
					console.log("FETCHED", res.data);
					this.setState({ items: res.data.items ? res.data.items : [] });
					this.setState({ cart: res.data.cart ? res.data.cart : { items: [] } });
					this.setState({ orders: res.data.orders ? res.data.orders : [] });
				})
				.catch((err) => {
					console.log(err);
				});
		}
		//if user is not logged in, just load items 
		else {
			Axios.get(`${URL}/items`).then((res) => {
				console.log("FETCHED ITEMS ONLY FOR VIEW", res.data);
				this.setState({ items: res.data.items ? res.data.items : [] });
			})
		}
	};

	submitCart = (cart) => {
		console.log(cart);
		let token = localStorage.getItem('token');
		// when i click this button, i want to submit cart. so the post url has to match the route that handles the change of cart to orders 
		//to redirect user from cart to payment page
		this.setState({ paymentStatus: true })
		Axios.post(`${URL}/cart/checkout`, cart, {
			headers: {
				'x-auth-token': token
			}
		})
			.then((res) => {
				// this.setState({ cart: []})
				console.log(res.data.order);
				this.setState({
					//update the orders to have a new order ontop of the current existing orders
					orders: [...this.state.orders, res.data.order],
					//clear the items in the cart
					cart: { items: [] }
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	componentDidMount() {
		// to tell the browser to remain logged in
		let token = localStorage.getItem('token');
		if (!(token == null)) {
			let decodedToken = decode(token);
			if (!decodedToken) {
				//if the toke is invalid, we remove it
				localStorage.removeItem('token');
			} else {
				this.getUserProfile(token);
				// this.setState({ isAuth: true });
			}
		}
	}
	render() {
		let { isAuth, user, errorMessage } = this.state;
		console.log('current state:', this.state);
		return (
			<div>
				<Router>
					{/* <Navigation user={user} /> */}
					<Navigation user={user} logout={this.logoutHandeler} login={this.loginHandler} />
					{errorMessage && <Alert>{errorMessage}</Alert>}
					{/* the error messages are the error we wrote in the api files */}
					<Switch>
						{/* allow user to view items on page without logging in */}
						{/* if no need to pass data, can use component */}
						{/* <Route exact path="/" component={Home} /> */}
						{/* if need to pass data e.g.props, use render */}
						<Route
							path="/"
							exact
							render={() => (
								<Home
									items={this.state.items}
									cart={this.state.cart}
									addItem={this.addItem}
									fetchItems={this.fetchItems}
								/>
							)}
						/>
						{/* exact so that item/add wont confuse with the item/:id  */}
						<Route
							exact
							path="/cart"
							// paymentStatus ? render={() => (<Success/>)} 
							// : render={() => <Cart cart={this.state.cart} fetchItems={this.fetchItems} submitCart={this.submitCart} paymentStatus={this.state.paymentStatus} />}
							render={() => <Cart cart={this.state.cart} fetchItems={this.fetchItems} submitCart={this.submitCart} paymentStatus={this.state.paymentStatus} />}
						/>
						{/* <PrivateRoute exact path="/cart" isAuth={isAuth} render={() => <Cart />} /> */}
						<Route
							exact
							path="/order"
							render={() => (
								<Order
									orders={this.state.orders}

								/>
							)}
						/>
						{/* <PrivateRoute exact path="/order" isAuth={isAuth} render={() => <Order />} /> */}
						<Route
							path="/register"
							exact
							render={() => (isAuth ? <Redirect to="/" /> : <Register register={this.registerHandler} />)}
						/>
						{/* check if user is auth, if yes redirect to / */}
						<Route
							path="/login"
							exact
							render={() => (isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
export default App;

// at / => see all items
// at /cart => cart (protected)
// at /orders => see all previous orders (protected)

// /register

// /login