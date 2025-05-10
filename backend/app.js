//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const doctorRoute = require("./Routes/doctor-route")
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Middleware
app.get("/", (req, res) => {
    res.send("Working...");
});

app.use("/doctors", doctorRoute);
// Serve static files from the 'uploads' folder


//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));