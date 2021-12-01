require('dotenv').config();
const express = require("express");
const router = express.Router();
router.use(express.json());

// mongoose environment
const mongoose = require("mongoose");

// mongoDB connection string
mongoose.connect(process.env.mongourl)
    .then(() => console.log("MongoDB connected."));

const companyModel = require("../models/company");

router.get("/", (req, res) => res.send("API of Company"));

//Add Company
router.post("/addcompany", async(req, res) => {
    const { company } = req.body;
    companyModel.create(company);
    return res.json({ data: "Company Added." });
});

//update Company
router.put("/editcompany/:id", async(req, res) => {
    const id = req.params.id;
    const product = req.body.ProductId;
    const EditCompany = await companyModel.findOneAndUpdate({ CompanyId: id }, { ProductId: product }, { new: true });
    return res.json({ data: "Company Updated." });
});

//Delete Company
router.delete("/deletecompany/:id", async(req, res) => {
    const id = req.params.id;
    const deletecompany = await companyModel.findOneAndDelete({ CompanyId: id });
    return res.json({ data: "Company Deleted." });
});

//Fetch company Details Based on product Name
router.get("/list/:productname", async(req, res) => {
    const productname=req.params.productname;
    const productModel = require("../models/product");
    const pname = await productModel.findOne({Title : productname});
    if(pname == null)
    {
        return res.json({data : "No Product Found."});
    }
    else{
        const companylist = await companyModel.find({ProductId : pname["ProductId"]});
        if(companylist == null)
        {
            return res.json({data : "No Company Found."});
        }
        return res.json({data : companylist});
    }

});
module.exports = router;
