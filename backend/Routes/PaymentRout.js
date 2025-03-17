import { Router } from "express";
import express from "express";
import { getAllPayments, addPayments, getByPayId, UpdatePayment, deletePayment } from "../Controllers/PaymentController.js";
const router = express.Router();

router.get("/", getAllPayments);
router.post("/", addPayments);
router.get("/:id", getByPayId);
router.put("/:id", UpdatePayment);
router.delete("/:id", deletePayment);

export default router;