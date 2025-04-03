import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
    patientName: string;
    age: string;
    gender: string;
}

const PatientSchema: Schema = new Schema({
    patientName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPatient>("Patient", PatientSchema);
