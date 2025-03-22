const express = require("express");
const router = express.Router();

// Import appointment controller functions
const { getAllAppointments, addAppointments, getById, updateAppointment, deleteAppointment } = require("../Controllers/ConsultationController.js");

// Route to get all appointments
router.get("/", getAllAppointments);

// Route to add a new appointment
router.post("/", addAppointments);

// Route to get an appointment by ID
router.get("/:id", getById);

// Route to update an existing appointment by ID
router.put("/:id", updateAppointment);

// Route to delete an appointment by ID
router.delete("/:id", deleteAppointment);  

// Export the router to be used in other parts of the application
module.exports = router;
