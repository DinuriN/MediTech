//TyslDJir7WM2Up5u
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const routerLabEqipment = require("./Routes/lab-equipment-route");
const cors = require("cors");
const app = express();
const chatbotRoutes = require('./Routes/chatbot-route');


//Middleware
app.use(express.json());
app.use(cors());
app.use("/labEquipments", routerLabEqipment);
<<<<<<< HEAD
app.use('/api/chatbot', chatbotRoutes);

=======
>>>>>>> f560ee5c4d61bac79238952a0876d657c0059e68

//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));