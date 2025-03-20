const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cardNo: {
    type: Number,
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
  }
});

module.exports = mongoose.model("Payment", paymentSchema); // Ensure model is named 'Payment'