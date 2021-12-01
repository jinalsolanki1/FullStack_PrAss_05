require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.json());
const sellerModel = require("../models/seller");

//mongodb connection
const mongoose = require("mongoose");
mongoose.connect(process.env.mongourl)
    .then(() => console.log("MongoDB connected."));

router.get("/", (req, res) => res.send("API of Seller."));

//Add seller
router.post("/addseller", async(req, res) => {
    const { seller } = req.body;
    sellerModel.create(seller);
    return res.json({ data: "Seller Added." });
});

//Update Seller
router.put("/editseller/:id", async(req, res) => {
    const sellerid = req.params.id;
    const productid = req.body.ProductId;
    const EditSeller = await sellerModel.findOneAndUpdate({ SellerId: sellerid }, { ProductId: productid }, { new: true });
    return res.json({ data: "Seller Updated." });
});

//Delete Seller
router.delete("/deleteseller/:id", async(req, res) => {
    const id = req.params.id;
    const DeleteSeller = await sellerModel.findOneAndDelete({ SellerId: id });
    return res.json({ data: "Seller Deleted." });
});

//Fetch Seller Details Based On ProductName 
router.get("/list/:productname", async(req,res)=> {
    const productname= req.params.productname;
    const productModel = require("../models/product");
    const pname = await productModel.findOne({Title : productname});
    if(pname==null)
    {
        res.json({data : "No Product Found."});
    }
    else{
        const sellerlist = await sellerModel.find({ProductId : pname["ProductId"]});
        if(sellerlist==null)
        {
            res.json({data : "No Seller Found."})
        }
        res.json({data : sellerlist});
    }
});
module.exports = router;