//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const doctorRoute = require("./Routes/doctor-route")

const app = express();

//Middleware
app.use("/doctors", doctorRoute)

//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));