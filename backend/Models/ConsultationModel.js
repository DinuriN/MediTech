
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gmail: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: Number, required: true },

  appointmentDate: { 
    type: Date,  // ✅ Changed to Date type
    required: true,
  },

  appointmentTime: { 
    type: String,  // ✅ Changed to String type
    required: true,
  },
  address: { type: String, required: true },
  appointmentType: { type: String, required: true },
  doctorOrScanType: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
