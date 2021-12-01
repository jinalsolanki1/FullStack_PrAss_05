const express=require("express");
const app = express();
const port=2000;

const RoutCompany = require("./routes/company");
const RoutProduct =require("./routes/product");
const RoutSeller = require("./routes/seller");

app.use("/company",RoutCompany);
app.use("/product",RoutProduct);
app.use("/seller",RoutSeller);


app.get("/", (req,res) => res.send("Hello"));
app.listen(port, () => console.log("on port 2000."));