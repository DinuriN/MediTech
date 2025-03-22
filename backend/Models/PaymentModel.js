const mongoose = require("mongoose");

// Define the schema for payment details
const paymentSchema = new mongoose.Schema({
  cardNo: {
    type: Number, // Stores the card number
    required: true, // Field is required
  },
  holderName: {
    type: String, // Cardholder's name
    required: true, // Field is required
  },
  paymentMethod: {
    type: String, // Payment method (e.g., Visa, MasterCard, PayPal)
    required: true, // Field is required
  },
  expires: {
    type: String, // Expiry date of the card (MM/YY format)
    required: true, // Field is required
  },
  cvv: {
    type: String, // CVV security code
    required: true, // Field is required
  }
});

// Export the model to be used in other parts of the application
module.exports = mongoose.model("Payment", paymentSchema);
