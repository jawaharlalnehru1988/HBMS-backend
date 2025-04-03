import { Request, Response } from "express";
import Patient from "../models/Patient";
import Bed from "../models/Bed";  // Assuming bed availability is tracked

// Admit a patient
export const admitPatient = async (req: Request, res: Response) => {
    try {
        const { patientName, age, gender } = req.body;

        const patient = await Bed.findOne({ patientName });

        // if (!patient) {
        //     res.status(400).json({ message: "Patient is not available" });
        //     return;
        // }

        // Create and save patient
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

export const updatePatient = async (req: Request, res: Response)=>{
    try{
        const {age, gender, patientName } = req.body;
        const patients = await Patient.findByIdAndUpdate(req.params.id, {age, gender, patientName});
        if(!patients){
            res.status(404).json({message: "User not found"});
            return;
        }
        res.json(patients);
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

export const deletePatient = async (req: Request, res: Response)=>{
    try {
        const userId = req.params.id;
        const deletePatient = await Patient.findByIdAndDelete(userId);
        if(!deletePatient){
            res.status(400).json({message: "Patient not Found" });
            return;
        }
    } catch (error) {
        res.status(500).json({message: "Server not found"});
    }
}
