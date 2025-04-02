import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    patientId: mongoose.Types.ObjectId;
    bedId: mongoose.Types.ObjectId;
    assignedDoctor: mongoose.Types.ObjectId;
    admissionDate: Date;
    dischargeDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const BookingSchema: Schema = new Schema<IBooking>(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        bedId: { type: mongoose.Schema.Types.ObjectId, ref: "Bed", required: true },
        assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        admissionDate: { type: Date, required: true },
        dischargeDate: { type: Date, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
