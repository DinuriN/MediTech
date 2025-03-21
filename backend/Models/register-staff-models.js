const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerStaffSchema = new Schema({
    staffId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model(
    "register-staff-model",
    registerStaffSchema
)