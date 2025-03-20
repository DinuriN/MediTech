

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';  // Import the CORS middleware
import consultationRoutes from "./Routes/ConsultationRout.js";
import paymentRoutes from "./Routes/PaymentRout.js";

const app = express();

// Use CORS middleware to enable cross-origin requests
app.use(cors());

app.use(express.json());

const mongoDBUri = "mongodb+srv://admin:hOPTUkwQGtUKIVaz@cluster0.cg58q.mongodb.net/";

mongoose.connect(mongoDBUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection failed", err));

app.use("/appointments", consultationRoutes);  // Corrected typo here
app.use("/payments", paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
