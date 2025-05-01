//TyslDJir7WM2Up5u
const express = require("express");
const mongoose = require("mongoose");
const doctorRoute = require("./Routes/doctor-route")
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const nodemailer = require("nodemailer");
const tesseract = require("node-tesseract-ocr")
const registerPatientRouter = require("./Routes/register-patient-route");
const registerStaffRouter = require("./Routes/register-staff-route");
const authRoutes=require("./Routes/login-auth");
const consultationRoutes = require("./Routes/ConsultationRout.js");
const paymentRoutes = require("./Routes/PaymentRout.js");
const medicalHistoryRouter=require("./Routes/medical-history-router");
const onlinePharmacyRouter = require("./Routes/online-pharmacy-route");
const routerLabEqipment = require("./Routes/lab-equipment-route");
const chatbotRoutes = require('./Routes/chatbot-route');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Middleware
app.get("/", (req, res) => {
    res.send("Working...");
});

app.use("/doctors", doctorRoute);
app.use("/patients", registerPatientRouter);
app.use("/meditechStaff", registerStaffRouter);
app.use("/api/auth", authRoutes);
app.use("/medicalHistory", medicalHistoryRouter)
app.use("/appointments", consultationRoutes);
app.use("/payments", paymentRoutes);
app.use("/onlinePharmacy",onlinePharmacyRouter);
app.use("/labEquipments", routerLabEqipment);

app.use('/api/chatbot', chatbotRoutes);



//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));