const express = require("express");
const jwt = require("jsonwebtoken");
const PatientModelFLogin = require("../Models/register-patient-model");
const StaffModelFLogin = require("../Models/register-staff-models");

const router = express.Router();

router.post("/loginForUsers", async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const patient = await PatientModelFLogin.findOne({ email });
        if (patient) {
            if (patient.password !== password) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            
            const token = jwt.sign({ id: patient._id }, "yourSecretKey", { expiresIn: "1h" });
            return res.json({
                token,
                userId: patient.patientId,
                name: patient.name,
                userType: "patient" 
            });
        }

      
        const staff = await StaffModelFLogin.findOne({ email });
        if (staff) {
            if (staff.password !== password) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            
            const token = jwt.sign({ id: staff._id }, "yourSecretKey", { expiresIn: "1h" });
            return res.json({
                token,
                userId: staff.staffId,
                name: staff.name,
                userType: "staff" 
            });
        }

        
        return res.status(400).json({ message: "Invalid credentials" });

    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
