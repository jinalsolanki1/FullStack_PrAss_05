const mongoose = require('mongoose');

//product Schema
const productSchema= mongoose.Schema({
    ProductId : String,
    Title : String,
    Price :String,
    Category : [{type : String}],
    CompanyId : String,
    SellerId : [{type : String}],
});
const productModel = mongoose.model("tblproduct",productSchema,"tblproduct");
module.exports=productModel;