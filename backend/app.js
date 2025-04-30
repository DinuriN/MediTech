const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handlers for appointments and payments
const consultationRoutes = require("./Routes/ConsultationRout.js");
const paymentRoutes = require("./Routes/PaymentRout.js");
const registerStaffRouter = require("./Routes/register-staff-route");
const authRoutes=require("./Routes/login-auth");
const registerPatientRouter=require("./Routes/register-patient-route.js");

const medicalHistoryRouter=require("./Routes/medical-history-router");

const app = express(); // Initialize Express application

app.use(express.json());
app.use(cors());


app.use("/patients", registerPatientRouter);
app.use("/meditechStaff", registerStaffRouter);
app.use("/api/auth", authRoutes);
app.use("/medicalHistory", medicalHistoryRouter)
app.use("/appointments", consultationRoutes);
app.use("/payments", paymentRoutes);



//Connecting mongodb
mongoose.connect("mongodb+srv://admin:TyslDJir7WM2Up5u@meditech-cluster.jf2kb.mongodb.net/")
.then(() => console.log("Connected to MongoDB")) // Log success message if connected
.then(() => {
    app.listen(5000); // Start server on port 5000
})
.catch((err) => console.log(err)); // Log any connection errors
