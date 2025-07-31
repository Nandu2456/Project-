const express = require('express');
const Product= require('../models/Product');
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const skip=(page-1)*limit;
        const products=await Product.find().skip(skip).limit(limit);
        res.status(200).json(products);
    }
    catch(err)
    {
        res.status(500).json({message: err.message});
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const product=await Product.findOne({id: req.params.id});
        if(!product) return res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    }
    catch(err)
    {
        res.status(500).json({message: err.message});
    }
})

module.exports=router;;