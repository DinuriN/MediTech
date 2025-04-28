const mongoose = require("mongoose");

// Define the schema for an appointment
const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: Number, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    address: { type: String, required: true },
    guardianName: { type: String, required: true },
    appointmentType: { type: String, required: true },
    doctorOrScanType: { type: String, required: true },
    payment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Payment', 
        default: null // Optional payment reference
    },
    status: { 
        type: String, 
        default: 'pending', 
        enum: ['pending', 'confirmed', 'cancelled']
    }
});

// Export the model
module.exports = mongoose.model("Appointment", appointmentSchema);