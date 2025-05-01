const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const onlinePharmacyModel = require("../Models/online-pharmacy-model");
const onlinePharmacyController = require("../Controllers/online-pharmacy-controller");
const { checkInteraction } = require("../Controllers/geminiController");
const { extractTextFromImage } = require("../Controllers/imageOcrController");
const { sendPdfEmail } = require("../Controllers/emailController");

// ========== Ensure upload directories exist ==========
const uploadPrescriptionDir = './uploads/order-prescription-files/';
if (!fs.existsSync(uploadPrescriptionDir)) {
  fs.mkdirSync(uploadPrescriptionDir, { recursive: true });
}

const uploadOcrDir = './uploads/ocr-uploads/';
if (!fs.existsSync(uploadOcrDir)) {
  fs.mkdirSync(uploadOcrDir, { recursive: true });
}

const uploadEmailDir = './uploads/email-uploads/';
if (!fs.existsSync(uploadEmailDir)) {
  fs.mkdirSync(uploadEmailDir, { recursive: true });
}

// ========== Multer Configurations ==========
const prescriptionStorage = multer.diskStorage({
  destination: uploadPrescriptionDir,
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const uploadPrescription = multer({ storage: prescriptionStorage });

const ocrStorage = multer.diskStorage({
  destination: uploadOcrDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadOcr = multer({ storage: ocrStorage });

const uploadEmail = multer({ dest: uploadEmailDir });

// ========== Routes ==========

// Upload prescription file
router.post('/uploadPrescriptionFile', uploadPrescription.single('prescriptionImg'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No prescription file uploaded' });
  }
  res.json({ filePath: `/uploads/order-prescription-files/${req.file.filename}` });
});

// CRUD operations for pharmacy orders
router.get("/", onlinePharmacyController.getOnlinePharamcyDetails);
router.post("/", onlinePharmacyController.addPharmacyOrder);
router.get("/:id", onlinePharmacyController.getOrderById);
router.put("/:id", onlinePharmacyController.updatePharmacyOrder);
router.delete("/:id", onlinePharmacyController.deletePharmacyOrder);

// Image OCR
router.post("/upload-image", uploadOcr.single("image"), extractTextFromImage);

// AI drug interaction check
router.post("/check-interaction", checkInteraction);

// Send email with attached PDF
router.post("/send-pdf-email", uploadEmail.single("pdfFile"), sendPdfEmail);

module.exports = router;
