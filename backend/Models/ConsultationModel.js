import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  doctorOrScanType: {
    type: String,
    required: true,
  },

});

export default mongoose.model("ConsultationModel", patientSchema);