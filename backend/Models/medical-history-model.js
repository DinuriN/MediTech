const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema({
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "register-patient-model",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    diagnoses: {
      type: String,
    },
    requiredReports: {
      type: String,
    },
    comments: {
      type: String,
    },
    
    
  });
  
  module.exports = mongoose.model(
    "medical-history-model", 
    medicalHistorySchema
);