const express = require("express");
const jwt = require("jsonwebtoken");
const PatientModelFLogin = require("../Models/register-patient-model");
const StaffModelFLogin = require("../Models/register-staff-models");

const router = express.Router();

router.post("/loginForUsers", async (req, res) => {
    const { email, password } = req.body;

    try {
        // First, check if the email belongs to a patient
        const patient = await PatientModelFLogin.findOne({ email });
        if (patient) {
            if (patient.password !== password) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate token for the patient
            const token = jwt.sign({ id: patient._id }, "yourSecretKey", { expiresIn: "1h" });
            return res.json({
                token,
                userId: patient.patientId,
                name: patient.name,
                userType: "patient" // Indicate that this is a patient
            });
        }

        // Then, check if the email belongs to a staff member
        const staff = await StaffModelFLogin.findOne({ email });
        if (staff) {
            if (staff.password !== password) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate token for the staff
            const token = jwt.sign({ id: staff._id }, "yourSecretKey", { expiresIn: "1h" });
            return res.json({
                token,
                userId: staff.staffId,
                name: staff.name,
                userType: "staff" // Indicate that this is a staff member
            });
        }

        // If no matching user (patient or staff) found
        return res.status(400).json({ message: "Invalid credentials" });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
