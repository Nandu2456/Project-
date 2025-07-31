const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const app=express();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});