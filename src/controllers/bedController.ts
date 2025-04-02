import { Request, Response } from "express";
import Bed from "../models/Bed";
import logger from "../utils/logger"; // Import logger

export const addBed = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bedNumber, type, status } = req.body;
        const existingBed = await Bed.findOne({ bedNumber });
        if (existingBed) {
            logger.warn("Bed already exists:", { bedNumber });
            res.status(400).json({ message: "Bed already exists" });
            return;
        }
        const newBed = new Bed({ bedNumber, type, status });
        logger.debug("New bed created:", newBed);
        await newBed.save();
        res.status(201).json({ message: "Bed added successfully", bed: newBed });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getAllBeds = async (req: Request, res: Response): Promise<void> => {
    try {
        const beds = await Bed.find();
        res.status(200).json(beds);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getBedById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bed = await Bed.findById(id);
        if (!bed) {
            res.status(404).json({ message: "Bed not found" });
            return;
        }
        res.status(200).json(bed);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateBed = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { bedNumber, type, status } = req.body;
        const updatedBed = await Bed.findOneAndUpdate( { bedNumber}, {type, status }, { new: true });
        if (!updatedBed) {
            res.status(404).json({ message: "Bed not found" });
            return;
        }
        res.status(200).json({ message: "Bed updated successfully", bed: updatedBed });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteBed = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedBed = await Bed.findByIdAndDelete(id);
        if (!deletedBed) {
            res.status(404).json({ message: "Bed not found" });
            return;
        }
        res.status(200).json({ message: "Bed deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getAvailableBeds = async (req: Request, res: Response): Promise<void> => {
    try {
        const availableBeds = await Bed.find({ status: "Available" });
        res.status(200).json(availableBeds);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


export const getOccupiedBeds = async (req: Request, res: Response): Promise<void> => {
    try {
        const occupiedBeds = await Bed.find({ status: "Occupied" });
        res.status(200).json(occupiedBeds);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}