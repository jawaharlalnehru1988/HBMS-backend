import express from "express";
import { admitPatient, deletePatient, getPatients, updatePatient } from "../controllers/patientController";
import authMiddleware from "../middleware/authMiddleware";

const patientRouter = express.Router();
patientRouter.use(authMiddleware);

patientRouter.post("/admit", admitPatient);      
patientRouter.get("/", getPatients);     
patientRouter.put("/update/:id", updatePatient);
patientRouter.delete("/delete/:id", deletePatient);
   
// patientRouter.delete("/discharge/:id", dischargePatient); 

export default patientRouter;
