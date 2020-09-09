import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Success extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Payment success :D</h1>

                <h1>Thanks for your order!</h1>
                <p>
                    We appreciate your business!
                    If you have any questions, please email
                    <a href="yaypaymentworks@gmail.com">yaypaymentworks@gmail.com</a>.
                </p>
                <Link className="nav-link" to="/order">Go to orders</Link>
            </React.Fragment>
        )
    }
}
