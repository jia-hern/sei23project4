// import React, { useState, useEffect } from "react";
// import {
//     CardElement,
//     useStripe,
//     useElements
// } from "@stripe/react-stripe-js";

// export default function CheckoutForm(props) {
//     const [succeeded, setSucceeded] = useState(false);
//     const [error, setError] = useState(null);
//     const [processing, setProcessing] = useState('');
//     const [disabled, setDisabled] = useState(true);
//     const [clientSecret, setClientSecret] = useState('');
//     const stripe = useStripe();
//     const elements = useElements();
//     const URL = process.env.REACT_APP_URL;


//     useEffect(() => {
//         // Create PaymentIntent as soon as the page loads

//         window
//             .fetch(`${URL}/cart/create-payment-intent`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-auth-token": localStorage.token
//                 },
//                 body: JSON.stringify({ items: props.cart, total: props.total })
//             })
//             .then(res => {
//                 return res.json();
//             })
//             .then(data => {
//                 console.log(data)
//                 setClientSecret(data.clientSecret);
//             });
//     }, []);
//     const cardStyle = {
//         style: {
//             base: {
//                 color: "#32325d",
//                 fontFamily: 'Arial, sans-serif',
//                 fontSmoothing: "antialiased",
//                 fontSize: "16px",
//                 "::placeholder": {
//                 }
//             },
//             invalid: {
//                 color: "#fa755a",
//                 iconColor: "#fa755a"
//             }
//         }
//     };
//     console.log("This is this.props.cart in checkoutForm.jsx", props.cart)

//     const handleChange = async (event) => {
//         // Listen for changes in the CardElement
//         // and display any errors as the customer types their card details
//         setDisabled(event.empty);
//         setError(event.error ? event.error.message : "");
//     };
//     const handleSubmit = async ev => {
//         ev.preventDefault();
//         setProcessing(true);
//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement)
//                 // payment_method: { card: this.cardNumberRef.current._element },
//             }
//         });
//         if (payload.error) {
//             console.log(payload.error.message)
//             setError(`Payment failed ${payload.error.message}`);
//             setProcessing(false);
//             props.paidStatus(false)

//         } else {

//             setError(null);
//             setProcessing(false);
//             setSucceeded(true);
//             props.paidStatus(true)
//         }
//     };
//     return (
//         <form id="payment-form" onSubmit={handleSubmit}>
//             <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
//             <button
//                 disabled={processing || disabled || succeeded}
//                 id="submit"
//             >
//                 <span id="button-text">
//                     {processing ? (
//                         <div className="spinner" id="spinner"></div>
//                     ) : (
//                             "Pay"
//                         )}
//                 </span>
//             </button>
//             {/* Show any error that happens when processing the payment */}
//             {error && (
//                 <div className="card-error" role="alert">
//                     {error}
//                 </div>
//             )}
//             {/* Show a success message upon completion */}
//             <p className={succeeded ? "result-message" : "result-message hidden"}>
//                 Payment succeeded, see the result in your
//         <a
//                     href={`https://dashboard.stripe.com/test/payments`}
//                 >
//                     Stripe dashboard.
//         </a> Refresh the page to pay again.
//       </p>
//         </form>
//     );
// }


import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
export default function CheckoutForm(props) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const URL = process.env.REACT_APP_URL;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch(`${URL}/cart/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.token
                },
                body: JSON.stringify({ items: props.cart, total: props.total })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, [props.cart, props.total]);
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                            "Pay"
                        )}
                </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
        <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
        </form>
    );
}