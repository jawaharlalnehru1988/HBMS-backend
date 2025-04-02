import express from "express";
import { admitPatient, getPatients, dischargePatient } from "../controllers/patientController";
import authMiddleware from "../middleware/authMiddleware";

const patientRouter = express.Router();

patientRouter.post("/admit", admitPatient);        // Admit a patient (Requires Token)
patientRouter.get("/all", getPatients);           // Get all admitted patients (Requires Token)
patientRouter.delete("/discharge/:id", dischargePatient); // Discharge patient (Requires Token)

export default patientRouter;
