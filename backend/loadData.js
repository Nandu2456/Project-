const mongoose=require('mongoose');
const csv=require('csvtojson');
require('dotenv').config();
const Product = require('./models/Product');
const { json } = require('express');
mongoose.connect(process.env.MONGO_URI,
     { useNewUrlParser: true, useUnifiedTopology: true }).
     then(()=>{console.log('Mongodb Connected');
     loadData();
});

async function loadData()
{
    const jsonArray=await csv().fromFile('data/products.csv');
    await Product.insertMany(jsonArray);
    console.log('Data Loaded Successfully');
    process.exit();
}

