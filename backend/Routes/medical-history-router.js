const express = require("express");
const router = express.Router();

const medicalHistoryModel=require("../Models/medical-history-model");
const medicalHistoryController=require("../Controllers/medical-history-controller");

router.get("/", medicalHistoryController.getMedicalHistoryDetails);
router.post("/", medicalHistoryController.addMedicalHistory);
router.get("/:id", medicalHistoryController.getmedicalHistoryById);
router.put("/:id", medicalHistoryController.updatemedicalHistory);
router.delete("/:id", medicalHistoryController.deletemedicalHistory);

module.exports = router;