const Appointment = require("../Models/ConsultationModel.js");  

// Get all appointments
const getAllAppointments = async (req, res, next) => {  
    let appointments;

    try {
        appointments = await Appointment.find(); // Fetch all appointments from the database
    } catch (err) {
        console.log(err);
    }

    // If no appointments found, return a 404 response
    if (!appointments) {
        return res.status(404).json({ message: "Appointments not found" });
    }

    // Return the list of appointments with a 200 status
    return res.status(200).json({ appointments });
};

// Add a new appointment
const addAppointments = async (req, res, next) => {
    const { name, gmail, age, contact, appointmentDate, appointmentTime, address, appointmentType, doctorOrScanType } = req.body;

    let appointments;

    try {
        // Create a new appointment object
        appointments = new Appointment({ name, gmail, age, contact, appointmentDate, appointmentTime, address, appointmentType, doctorOrScanType });
        await appointments.save();  // Save the appointment to the database
    } catch (err) {
        console.log(err);
    }

    // If appointment could not be added, return a 404 response
    if (!appointments) {
        return res.status(404).send({ message: "Unable to add appointment" });
    }

    // Return the newly created appointment with a 200 status
    return res.status(200).json({ appointments });
};

// Get an appointment by ID
const getById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id); // Find the appointment by ID
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' }); // If not found, return 404
        res.status(200).json({ appointment }); // Return the found appointment
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
};

// Update an existing appointment by ID
const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the appointment
        if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' }); // If not found, return 404
        res.status(200).json(updatedAppointment); // Return the updated appointment
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle update errors
    }
};

// Delete an appointment by ID
const deleteAppointment = async (req, res, next) => {
    const id = req.params.id;
    let appointment;

    try {
        appointment = await Appointment.findByIdAndDelete(id); // Find and delete the appointment by ID
    } catch (err) {
        console.log(err);
    }

    // If the appointment does not exist, return a 404 response
    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    // Return the deleted appointment with a 200 status
    return res.status(200).json({ appointment });
};

// Export all functions
module.exports = {
    getAllAppointments,
    addAppointments,
    getById,
    updateAppointment,
    deleteAppointment
};
