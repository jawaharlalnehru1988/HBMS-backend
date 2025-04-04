import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    patientId: mongoose.Types.ObjectId;
    bedId: mongoose.Types.ObjectId;
    admissionDate: Date;
    status: "Admitted" | "Discharged" | "Pending";
    dischargeDate: Date;
}

const BookingSchema: Schema = new Schema<IBooking>(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        bedId: { type: mongoose.Schema.Types.ObjectId, ref: "Bed", required: true },
        status: { type: String, enum: ["Admitted", "Discharged", "Pending"], default: "Pending" },
        admissionDate:  Date,
        dischargeDate: Date,
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
