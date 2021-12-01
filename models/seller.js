const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
    SellerId : String,
    Name : String,
    ProductId : [{type : String}],
});

const sellerModel = mongoose.model("tblseller", SellerSchema,"tblseller");
module.exports =sellerModel;