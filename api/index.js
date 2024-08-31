//JS goes in her 

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 500 },
    { id: 3, name: 'Tablet', price: 300 },
];

let cart = [];
let orders = [];

// List Products
app.get('/products', (req, res) => {
    res.json(products);
});

// Add Product to Cart
app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;

    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = { ...product, quantity };
        cart.push(cartItem);
        res.json({ message: 'Product added to cart', cart });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// View Cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// Place Order
app.post('/order', (req, res) => {
    const orderId = uuidv4();
    const order = { id: orderId, items: [...cart] };
    orders.push(order);
    cart = [];  // Clear the cart after placing the order
    res.json({ message: 'Order placed successfully', order });
});

// View Orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

