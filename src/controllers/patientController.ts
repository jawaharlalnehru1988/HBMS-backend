import { Request, Response } from "express";
import Patient from "../models/Patient";
import Bed from "../models/Bed";  // Assuming bed availability is tracked

// Admit a patient
export const admitPatient = async (req: Request, res: Response) => {
    try {
        const { name, age, symptoms, bedNumber } = req.body;

        // Check if bed is available
        const bed = await Bed.findOne({ bedNumber, status: "Available" });

        if (!bed) {
            res.status(400).json({ message: "Bed is not available" });
            return;
        }

        // Create and save patient
        const newPatient = new Patient({ name, age, symptoms, bedNumber });
        await newPatient.save();

        // Mark bed as occupied
        await Bed.findOneAndUpdate({ bedNumber }, { status: "Occupied" });

        res.status(201).json({ message: "Patient admitted successfully", patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all admitted patients
export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Discharge a patient
export const dischargePatient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find and delete patient
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
             res.status(404).json({ message: "Patient not found" });
             return;
        }

        // Mark bed as available again
        await Bed.findOneAndUpdate({ bedNumber: patient.bedId }, { status: "Available" });

        res.json({ message: "Patient discharged successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
