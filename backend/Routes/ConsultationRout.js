
import express from "express";
const router = express.Router();
import { getAllPatients, addPatients, getById, UpdatePatient, deletePatient } from "../Controllers/ConsultationController.js";

router.get("/", getAllPatients);
router.post("/", addPatients);
router.get("/:id", getById);
router.put("/:id", UpdatePatient);
router.delete("/:id", deletePatient); // Add delete route

export default router;