const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlinePharmacySchema = new Schema({
  patientName: {
    type: String,
    required: [true, "Patient name is required"],
    trim: true,
    maxlength: [50, "Patient name cannot exceed 50 characters"]
  },
  patientAge: {
    type: Number,
    required: [true, "Patient age is required"],
    min: [0, "Age must be at least 0"],
    max: [120, "Age cannot exceed 120"]
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Gender must be either 'male' or 'female'"
    },
    required: [true, "Gender is required"]
  },
  patientEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  patientContact: {
    type: String,
    required: [true, "Contact number is required"],
  },
  prescriptionFile: {
    type: String, // Storing file URL or path
    required: [true, "Prescription file is required"]
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ["cash_on_delivery", "online_payment"],
      message: "Payment method must be 'cash_on_delivery' or 'online_payment'"
    },
    required: [true, "Payment method is required"]
  },
  deliveryAddress: {
    type: String,
    required: [true, "Delivery address is required"],
    maxlength: [200, "Delivery address cannot exceed 200 characters"]
  },
  uploadedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  comments: {
    type: String,
    default: "",
    maxlength: [500, "Comments cannot exceed 500 characters"]
  }


});

module.exports = mongoose.model(
    "online-pharmacy-model",
      onlinePharmacySchema
);