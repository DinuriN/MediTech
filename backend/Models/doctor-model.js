const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    doctorId:{
        type: String,
        required: true,
    },
    doctorName:{
        type: String, //dataType
        required: true, //validate
    },
    doctorAddress:{
        type: String,
        required: false,
    },
    doctorSpecialization:{
        type: String, //dataType
        required: true, //validate
    },
    doctorProfilePicture:{
        type: String, //dataType
        required: false, //validate
    },
    doctorPhoneNumber:{
        type: String, //dataType
        required: true, //validate
    },
    doctorEmail:{
        type: String, //dataType
        required: true, //validate
    },
    doctorQualifications: {
        type: [String], // Array of qualifications
        required: true,
    },
    doctorExperience: {
        type: Number, // Number of years
        required: true,
    },
    doctorLanguagesSpoken: {
        type: [String], // Array of languages
        required: false,
    },
    doctorHospitalAffiliation: {
        type: String,
        required: true,
    },
    doctorLicenseNumber: {
        type: String,
        required: true,
    },
    doctorAvailableDays:{
        type: [String], //dataType
        required: true, //validate
    },
    doctorAvailableTimeStart:{
        type: String, //dataType
        required: true, //validate
    },
    doctorAvailableTimeEnd:{
        type: String, //dataType
        required: true, //validate
    },
    doctorConsultationFees:{
        type: Number, //dataType
        required: true, //validate
    }
})

module.exports = mongoose.model(
    "doctor-model", //file name
    DoctorSchema //function name
)