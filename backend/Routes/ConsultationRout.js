const express = require("express");
const router = express.Router();

const { getAllAppointments, addAppointments, getById, updateAppointment, deleteAppointment, addPaymentForAppointment } = require("../Controllers/ConsultationController.js");

router.get("/", getAllAppointments);
router.post("/", addAppointments);
router.get("/:id", getById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.post("/payments", addPaymentForAppointment);

module.exports = router;