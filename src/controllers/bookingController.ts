import { Request, Response } from "express";
import Booking from "../models/Booking";
import Bed from "../models/Bed";
import { stat } from "fs";

// Book a bed
export const bookBed = async (req: Request, res: Response) => {
    try {
        const { patientId, bedId, status, admissionDate, dischargeDate } = req.body;
        const newBooking = await Booking.create({
            patientId,
            bedId,
            status,
            admissionDate,
            dischargeDate,
        });
        if (status === "Admitted") {
            const updatedBed = await Bed.findByIdAndUpdate(bedId, {status: "Occupied"});
            res.status(201).json({message: "Patient admitted in the bed "+bedId, updatedBed});
        } else if (status === "Discharged"){
            const dischargeBed = await Bed.findByIdAndUpdate(bedId, {status: "Available"});
            res.status(201).json({message: "Patient discharged from the bed " + bedId, dischargeBed});
        }
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: "Error booking bed", error });
    }
};

// Update booking details
export const updateBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) {
         res.status(404).json({ message: "Booking not found" });
            return;
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error });
    }
};

// Cancel a booking
export const discharge = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
          res.status(404).json({ message: "Booking not found" });
        return;
        }
        res.status(200).json({ message: "Discharged successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling booking", error });
    }
};
