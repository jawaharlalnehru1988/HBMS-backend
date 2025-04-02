import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
    patientName: string;
    age: number;
    gender: string;
    admissionDate: Date;
    bedId: string;
}

const PatientSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    admissionDate: { type: Date, required: true },
    bedId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPatient>("Patient", PatientSchema);
