const express = require('express');
const router = express.Router();

//insert model
const Patient = require("../Models/register-patient-model");
//insert controller
const registerPatientController = require('../Controllers/register-patient-controller');

router.get("/", registerPatientController.getRegisteredPatientDetails);
router.post("/", registerPatientController.addPatient);
router.get("/:id", registerPatientController.getPatientById);
router.put("/:id", registerPatientController.editPatientDetails);
router.delete("/:id", registerPatientController.deletePatient);


module.exports = router;