//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const doctorRoute = require("./Routes/doctor-route")
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require("cors")

//Middleware
app.use(express.json());
app.use(cors());
app.use("/doctors", doctorRoute);
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err))); 