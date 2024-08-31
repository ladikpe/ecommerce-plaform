import React from 'react';
import axios from 'axios';

const Cart = ({ cart, clearCart }) => {
    const placeOrder = () => {
        axios.post('http://localhost:3000/order', {})
            .then(response => {
                alert('Order placed successfully');
                clearCart();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
};

export default Cart;
