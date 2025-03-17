const express = require("express");
const router = express.Router();
//insert model
const labEquipment = require("../Models/lab-equipment-model");
//insert lab equipment controller
const labEquipmentController = require("../Controllers/lab-equipment-controller");

router.get("/",labEquipmentController.getAllLabEquipments);
router.post("/",labEquipmentController.addLabEquipment);
router.get("/:id",labEquipmentController.getLabEquipmentById);
router.put("/:id",labEquipmentController.updateLabEquipmentDetails);


//export
module.exports = router;