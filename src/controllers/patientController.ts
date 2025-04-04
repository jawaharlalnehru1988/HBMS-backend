import { Request, Response } from "express";
import Patient from "../models/Patient";
import Bed from "../models/Bed";  // Assuming bed availability is tracked

// Admit a patient
export const admitPatient = async (req: Request, res: Response) => {
    try {
        const { patientName, age, gender } = req.body;

       await Bed.findOne({ patientName });
       
        const newPatient = new Patient({ patientName, age, gender });
        await newPatient.save();

        // Mark bed as occupied
        await Bed.findOneAndUpdate({ patientName });

        res.status(201).json({ message: "Patient admitted successfully", patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const { patientName, age, gender } = req.body; // Extract fields from payload
        const patientId = req.params.id;

        const updatedPatient = await Patient.findByIdAndUpdate(
            patientId,
            { patientName, age, gender }, // Update with payload fields
            { new: true } // Return the updated document
        );

        if (!updatedPatient) {
            res.status(404).json({ message: "Patient not found" });
            return;
        }

        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const deletePatient = async (req: Request, res: Response) => {
    try {
        console.log("Delete patient request received", { params: req.params });

        const { id } = req.params;
        const userId = id;
        console.log("Attempting to delete patient with ID:", userId);
        const deletedPatient = await Patient.findByIdAndDelete(userId);

        if (!deletedPatient) {
            console.warn("Patient not found for ID:", userId);
            res.status(404).json({ message: "Patient not found" });
            return;
        }

        console.log("Patient deleted successfully", { deletedPatient });
        res.status(200).json({ message: "Patient deleted successfully", patient: deletedPatient });
    } catch (error) {
        console.error("Error occurred while deleting patient", { error });
        res.status(500).json({ message: "Server error", error });
    }
};
