import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation({ user, logout }) {
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Navbar.Brand href="/">My Shop</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Link className="nav-link" to="/">
						Home
					</Link>
					<Link className="nav-link" to="/item/add">
						Add item
					</Link>
					<Link className="nav-link" to="/cart">
						Cart
					</Link>
					<Link className="nav-link" to="/order">
						Order
					</Link>
				</Nav>

				<Nav>
					{user ? (
						<React.Fragment>
							<Nav.Link href="#user">
								{user.firstname} {user.lastname}
							</Nav.Link>
							<Link to="/logout" onClick={logout} className="nav-link">
								Logout
							</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Link to="/login" className="nav-link">
								Login
							</Link>
							<Link to="/register" className="nav-link">
								Register
							</Link>
						</React.Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Navigation;
