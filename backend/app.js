import express from "express";
import mongoose from "mongoose";
import cors from 'cors';  // Import the CORS middleware
import consultationRoutes from "./Routes/ConsultationRout.js";
import paymentRoutes from "./Routes/PaymentRout.js";

const app = express();

// Use CORS middleware here to enable cross-origin requests
app.use(cors());  

app.use(express.json());

mongoose.connect("mongodb+srv://admin:hOPTUkwQGtUKIVaz@cluster0.cg58q.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection failed", err));

app.use("/patients", consultationRoutes);
app.use("/payments", paymentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
