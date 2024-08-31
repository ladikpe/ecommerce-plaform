import React, { useState } from 'react';
import ProductList from './ProductList';
import Login from './Login';
import Cart from './Cart';

function App() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    const addToCart = (productId) => {
        // Assuming each product is unique in the cart, add quantity directly
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { id: productId, quantity: 1 }];
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <div className="App">
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <ProductList addToCart={addToCart} />
                    <Cart cart={cart} clearCart={clearCart} />
                </div>
            )}
        </div>
    );
}

export default App;
