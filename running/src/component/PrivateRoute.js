import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// { component : Component, isAuth, ...rest } is to specify what we pass into the component
// in the return statement do not need the this.props...

function PrivateRoute({ component: Component, isAuth, ...rest }) {
	console.log(rest);
	return <Route {...rest} render={(props) => (!isAuth ? <Redirect to="/login" /> : <Component {...props} />)} />;
}

export default PrivateRoute;
