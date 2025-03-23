//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path'); 
const multer = require('multer');
// Add this line to import the 'path' module
//const registerPatientRouter = require("./Routes/register-patient-route");
const onlinePharmacyRouter = require("./Routes/online-pharmacy-route");

const app = express();


//Middleware
 app.use(express.json());
 app.use(cors());
 app.use("/onlinePharmacy",onlinePharmacyRouter);

 // Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));