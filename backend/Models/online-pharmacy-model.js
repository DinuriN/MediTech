const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlinePharmacySchema = new Schema({
  orderId:{
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAge: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientContact: {
    type: String,
    required: true,
  },
  prescriptionFile: {
    type: String, // Storing file URL or path
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  uploadedDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model(
    "online-pharmacy-model",
      onlinePharmacySchema
);