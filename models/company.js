const mongoose = require('mongoose');

//company Schema
const companySchema = mongoose.Schema({
    CompanyId: String,
    Name: String,
    ProductId: [{ type: String }],
});
const companyModel = mongoose.model("tblcompany", companySchema, "tblcompany");
module.exports = companyModel;