require('dotenv').config();
const express = require("express");
const router = express.Router();
router.use(express.json());
const productModel = require("../models/product");

// mongoose environment
const mongoose = require("mongoose");
const { json } = require('express');

// mongoDB connection string
mongoose.connect(process.env.mongourl)
    .then(() => console.log("MongoDB connected."));

router.get("/", (req, res) => res.send("API of Product."));

//Add Product
router.post("/addproduct", async(req, res) => {
    const { product } = req.body;
    productModel.create(product);
    return res.json({ data: "Product Added." });
});

//Update Company
router.put("/editproduct/:id", async(req, res) => {
    const productid = req.params.id;
    const category = req.body.Category;
    const EditProduct = await productModel.findOneAndUpdate({ ProductId: productid }, { Category: category }, { new: true });
    return res.json({ data: "Product Updated." });
});

//Delete Company
router.delete("/deleteproduct/:id", async(req, res) => {
    const id = req.params.id;
    const DeleteProduct = await productModel.findOneAndDelete({ ProductId: id });
    return res.json({ data: "Product Deleted." });
});

//Fetch All Product of Company
router.get("/list/:companyname", async(req,res) => {
    const companyname= req.params.companyname;
    const companyModel = require("../models/company");
    const comname = await companyModel.findOne({Name : companyname});
    if(comname==null)
    {
        res.json({data : "No Company Found."});
    } 
    else{
        const productlist = await productModel.find({ProductId : comname["ProductId"]});
        if(productlist==null)
        {
            res.json({data : "No Product Found."});
        }
        res.json({data : productlist});
    }
});

//Fetch All Product of Seller
router.get("/list1/:sellername", async(req,res) => {
    const sellername = req.params.sellername;
    const sellerModel = require("../models/seller");
    const sname = await sellerModel.findOne({Name : sellername});
    if(sname==null)
    {
        res.json({data : "No Seller Found."})
    }
    else{
        const productlist = await productModel.find({ProductId : sname["ProductId"]});
        if(productlist==null)
        {
            res.json({data : "No Product Found."})
        }
        res.json({data : productlist});
    }
});
module.exports = router;