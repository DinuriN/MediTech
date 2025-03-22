const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handlers for appointments and payments
const consultationRoutes = require("./Routes/ConsultationRout.js");
const paymentRoutes = require("./Routes/PaymentRout.js");

const app = express(); // Initialize Express application

// Middleware
// Uncomment the below code for a basic test route
// app.use("/", (req, res, next) => {
//     res.send("Working...");
// });

// Middleware to parse JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// Use the consultation routes for handling appointment-related requests
app.use("/appointments", consultationRoutes);

// Use the payment routes for handling payment-related requests
app.use("/payments", paymentRoutes);

// Connect to MongoDB database
mongoose.connect("mongodb+srv://admin:hOPTUkwQGtUKIVaz@cluster0.cg58q.mongodb.net/")
.then(() => console.log("Connected to MongoDB")) // Log success message if connected
.then(() => {
    app.listen(5000); // Start server on port 5000
})
.catch((err) => console.log(err)); // Log any connection errors
