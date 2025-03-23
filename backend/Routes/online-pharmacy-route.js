const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const onlinePharmacyModel=require("../Models/online-pharmacy-model")
const onlinePharmacyController=require("../Controllers/online-pharmacy-controller");

const uploadDir = './uploads/order-prescription-files/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const PrescriptionfileStorage = multer.diskStorage({
    destination: uploadDir, // Directory where profile pictures will be stored
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Create a unique filename
    },
  });

  const uploadPrescription = multer({ storage: PrescriptionfileStorage });

  router.post('/uploadPrescriptionFile', uploadPrescription.single('prescriptionImg'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No prescription file uploaded' });
  }
  res.json({ filePath: `/uploads/order-prescription-files/${req.file.filename}` });
});



router.get("/", onlinePharmacyController.getOnlinePharamcyDetails);
router.post("/", onlinePharmacyController.addPharmacyOrder);
router.get("/:id", onlinePharmacyController.getOrderById);
router.put("/:id", onlinePharmacyController.updatePharmacyOrder);
router.delete("/:id", onlinePharmacyController.deletePharmacyOrder);
//export
module.exports = router;