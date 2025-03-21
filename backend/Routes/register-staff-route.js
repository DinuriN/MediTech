const express = require('express');
const router = express.Router();

//insert model
const Staff = require("../Models/register-staff-models");
//insert controller
const registerStaffController = require('../Controllers/register-staff-controller');

router.get("/", registerStaffController.getRegisteredStaffDetails);
router.post("/", registerStaffController.addStaff);
router.get("/:id", registerStaffController.getStaffById);
router.put("/:id", registerStaffController.editStaffDetails);
router.delete("/:id", registerStaffController.deleteStaff);


module.exports = router;