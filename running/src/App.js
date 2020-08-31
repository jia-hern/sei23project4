import React, { Component } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { decode } from 'jsonwebtoken';
import { Alert } from 'react-bootstrap';

import Navigation from './component/Navigation';
import Home from './component/Home';
import AddItem from './component/items/AddItem';
import Cart from './component/Cart';
import Order from './component/Order';
import Register from './component/auth/Register';
import Login from './component/auth/Login';

const URL = process.env.REACT_APP_URL;
class App extends Component {
	mounted = true;
	state = {
		items        : [],
		cart         : [],
		orders       : [],
		errorMessage : null,
		isAuth       : false,
		user         : null
	};
	logoutHandeler = (e) => {
		e.preventDefault();
		console.log('i logged out');
		this.setState({
			items        : [],
			cart         : [],
			orders       : [],
			errorMessage : null,
			isAuth       : false,
			user         : null
		});
		localStorage.removeItem('token');
	};
	getUserProfile = (token) => {
		Axios.get(`${URL}/auth/user`, {
			headers : {
				'x-auth-token' : token
			}
		})
			.then((res) => {
				console.log(res.data);
				this.setState({ isAuth: true, user: res.data.user });
			})
			.catch((err) => {
				console.log(err);
				// for safety, setAuth to false
				// this.setState({ isAuth: false, errorMessage: err.response.data.message });
			});
	};
	loginHandler = (credentials) => {
		//login here
		Axios.post(`${URL}/auth/login`, credentials)
			.then((res) => {
				console.log(res.data);

				// take local storage and save the token
				localStorage.setItem('token', res.data.token);
				//get uptodate user information
				this.getUserProfile(res.data.token);
			})
			.catch((err) => {
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
					isAuth : true
				});
			})
			.catch((err) => {
				console.log(err);
				console.log(err.res);
				this.setState({
					isAuth : false
				});
			});
	};
	addItem = (item) => {
		let token = localStorage.getItem('token');
		if (token) {
			Axios.post(`${URL}/cart/${item._id}/add`, {
				headers : {
					'x-auth-token' : token
				}
			})
				.then((res) => {
					console.log(item);
					let tempState = { ...this.state }; //copy of state
					tempState.cart.push(item);
					console.log(tempState);
					// this.state.cart.push(item);
					//set state
					this.setState(tempState);
					console.log(this.state);
				})
				.catch((err) => {
					console.log(err.response.data);
					console.log(err);
				});
		} else {
			console.log('no token added');
		}
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
				this.setState({ cart: res.data.cart });
			})
			.catch((err) => {
				console.log(err);
			});
	};
	updateCart = () => {};
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
		console.log(this.state.cart);
		return (
			<div>
				<Router>
					{/* <Navigation user={user} /> */}
					<Navigation user={user} logout={this.logoutHandler} />
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
						{/*tbc if shopper and customer are using the same pages*/}
						{/* exact so that item/add wont confuse with the item/:id  */}
						<Route path="/item/add" exact render={() => <AddItem />} />
						<Route
							exact
							path="/cart"
							render={() => <Cart cart={this.state.cart} fetchItems={this.fetchItems} />}
						/>
						{/* <PrivateRoute exact path="/cart" isAuth={isAuth} render={() => <Cart />} /> */}
						<Route exact path="/order" render={() => <Order orders={this.state.orders} />} />
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
