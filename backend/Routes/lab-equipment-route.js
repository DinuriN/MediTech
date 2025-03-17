const express = require("express");
const router = express.Router();
//insert model
const labEquipment = require("../Models/lab-equipment-model");
//insert lab equipment controller
const labEquipmentController = require("../Controllers/lab-equipment-controller");

router.get("/",labEquipmentController.getAllLabEquipments);
router.post("/",labEquipmentController.addLabEquipment);


//export
module.exports = router;