const express = require("express");
const router = express.Router();

const onlinePharmacyModel=require("../Models/online-pharmacy-model")
const onlinePharmacyController=require("../Controllers/online-pharmacy-controller");

router.get("/", onlinePharmacyController.getOnlinePharamcyDetails);
router.post("/", onlinePharmacyController.addPharmacyOrder);
router.get("/:id", onlinePharmacyController.getOrderById);
router.put("/:id", onlinePharmacyController.updatePharmacyOrder);
router.delete("/:id", onlinePharmacyController.deletePharmacyOrder);
//export
module.exports = router;