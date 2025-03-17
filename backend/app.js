//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const routerLabEqipment = require("./Routes/lab-equipment-route");
const cors = require("cors");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use("/labEquipments", routerLabEqipment);

//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));