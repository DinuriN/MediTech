const express = require("express");
const router = express.Router();

// Ensure the path is correct based on your project structure
const {
    getAllPayments,
    addPayments,
    getByPayId,
    updatePayment,
    deletePayment
} = require("../Controllers/PaymentController"); // Correct path to PaymentController

// Define routes
router.get("/", getAllPayments);  // Get all payments
router.post("/", addPayments);    // Add a new payment
router.get("/:paymentId", getByPayId);  // Get payment by ID
router.put("/:id", updatePayment);  // Update payment
router.delete("/:id", deletePayment); // Delete payment

module.exports = router;