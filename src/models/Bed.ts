import mongoose, {Schema, Document} from "mongoose";

export interface IBed extends Document {
    bedNumber: string;
    type: "Emergency" | "ICU" | "general";
    status: "Available" | "Occupied" | "Under Maintenance";
}

const BedSchema: Schema = new Schema({
    bedNumber: {type: String, required: true, unique: true},
    type: {type: String, enum: ["Emergency", "ICU", "general"], required: true},
    status: {type: String, enum: ["Available", "Occupied", "Under Maintenance"], default: "Available"},
}, {timestamps:true});

export default mongoose.model<IBed>("Bed", BedSchema);
