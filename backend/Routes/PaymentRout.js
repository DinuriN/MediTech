const express = require("express");
const router = express.Router();

const {
    getAllPayments,
    addPayments,
    getByPayId,
    updatePayment,
    deletePayment
} = require("../Controllers/PaymentController");

router.get("/", getAllPayments);
router.post("/", addPayments);
router.get("/:paymentId", getByPayId);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;