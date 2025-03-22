const mongoose = require("mongoose");

// Define the schema for an appointment
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Patient's name (required)
  gmail: { type: String, required: true }, // Patient's email (required)
  age: { type: Number, required: true }, // Patient's age (required)
  contact: { type: Number, required: true }, // Patient's contact number (required)

  appointmentDate: { 
    type: Date,  // Stores the date of the appointment
    required: true,
  },

  appointmentTime: { 
    type: String,  // Stores the time of the appointment
    required: true,
  },

  address: { type: String, required: true }, // Patient's address (required)
  appointmentType: { type: String, required: true }, // Type of appointment (e.g., consultation, scan)
  doctorOrScanType: { type: String, required: true }, // Doctor or scan category (e.g., cardiologist, MRI)
});

// Export the model to be used in other parts of the application
module.exports = mongoose.model("Appointment", appointmentSchema);
