
const Appointment = require("../Models/ConsultationModel.js");  // Ensure model is imported correctly

// Display part
const getAllAppointments = async (req, res, next) => {  // Display function
    let appointments;

    // Get all appointments
    try {
        appointments = await Appointment.find();
    } catch (err) {
        console.log(err);
    }

    // Not found
    if (!appointments) {
        return res.status(404).json({ message: "appointments not found" });
    }

    // Display all appointments
    return res.status(200).json({ appointments });
};

// Data Insert
const addAppointments = async (req, res, next) => {
    const { name,gmail,age,contact,appointmentDate,appointmentTime,address,appointmentType,doctorOrScanType } = req.body;

    let appointments;

    try {
        appointments = new Appointment({name,gmail,age,contact,appointmentDate,appointmentTime,address,appointmentType,doctorOrScanType });
        await appointments.save();  // Save the details in the database
    } catch (err) {
        console.log(err);
    }

    // If not inserted
    if (!appointments) {
        return res.status(404).send({ message: "Unable to add appointments" });
    }

    return res.status(200).json({ appointments });
};

// Get by Id
const getById = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ appointment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Update Appointment detail
const updateAppointment = async (req, res) => {
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(updatedAppointment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
// Delete Appointment
const deleteAppointment = async (req, res, next) => {
    const id = req.params.id;
    let appointment;

    try {
        appointment = await Appointment.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!appointment) {
        return res.status(404).json({ message: "appointment not found" });
    }

    return res.status(200).json({ appointment });
};

module.exports = {
    getAllAppointments,
    addAppointments,
    getById,
    updateAppointment,
    deleteAppointment
};