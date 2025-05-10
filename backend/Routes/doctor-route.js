const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Insert Model
const Doctor = require("../Models/doctor-model");
// Insert Doctors Controller
const DoctorController = require("../Controllers/doctor-controller");

// Ensure the upload directory exists
const uploadDir = './uploads/doc-prof-profile-pictures/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up the storage configuration for the profile picture
const DoctorProfilePicStorage = multer.diskStorage({
  destination: uploadDir, // Directory where profile pictures will be stored
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Create a unique filename
  },
});

// Set up multer to use the above storage configuration
const uploadDocProf = multer({ storage: DoctorProfilePicStorage });

// Route to upload profile picture
router.post('/uploadDoctorProfilePic', uploadDocProf.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No profile picture uploaded' });
  }
  res.json({ filePath: `/uploads/doc-prof-profile-pictures/${req.file.filename}` });
});

const { matchDoctorsBySymptoms } = require('../Controllers/symptom-mapping');

router.post('/match-doctors', async (req, res) => {
  try {
    const { symptoms, severity, duration, age, gender } = req.body;

    // Validate required fields
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "At least one symptom is required" });
    }
    if (!['mild', 'moderate', 'severe'].includes(severity)) {
      return res.status(400).json({ error: "Invalid severity value" });
    }

    // Convert age to number
    const patientAge = parseInt(age) || 0;
    
    const doctors = await matchDoctors(
      symptoms,
      severity,
      duration,
      patientAge,
      gender
    );

    res.json(doctors);
    
  } catch (error) {
    console.error('Doctor matching error:', error);
    res.status(500).json({ 
      error: "Failed to find matching doctors",
      details: error.message 
    });
  }
});

// In your Express routes file
router.post('/search', async (req, res) => {
  try {
    const { specialty } = req.body;
    const doctors = await Doctor.find({ 
      doctorSpecialization: specialty 
    });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Doctor routes
router.get("/", DoctorController.getAllDoctors);
router.post("/", DoctorController.addDoctors);
router.get("/:id", DoctorController.getById);
router.put("/:id", DoctorController.updateDoctor);
router.delete("/:id", DoctorController.deleteDoctor);

module.exports = router;
