const mongoose = require("mongoose");

// Define the schema for payment details
const paymentSchema = new mongoose.Schema({
  cardNo: {
    type: String, // Changed to String to handle full card numbers
    required: true,
  },
  holderName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  expires: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 2000, // Fixed amount of Rs. 2000
  },
  paymentDate: {
    type: Date,
    required: true,
    default: Date.now, // Default to current date
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true, // Foreign key to Appointment
  },
});

// Export the model
module.exports = mongoose.model("Payment", paymentSchema);