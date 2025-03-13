const express = require("express");
const router = express.Router();

//Insert Model
const Doctor = require("../Models/doctor-model");
//Insert Doctors Controller
const DoctorController = require("../Controllers/doctor-controller");

router.get("/", DoctorController.getAllDoctors);
router.post("/", DoctorController.addDoctors);
router.get("/:id", DoctorController.getById);
router.put("/:id", DoctorController.updateDoctor);
router.delete("/:id", DoctorController.deleteDoctor);

//export
module.exports = router;