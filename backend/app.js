//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use("/", (req, res, next)=>{
    res.send("Working...");
})

//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));