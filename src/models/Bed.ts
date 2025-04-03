import mongoose, {Schema, Document} from "mongoose";

export interface IBed extends Document {
    bedNumber: string;
    ward: "Emergency" | "ICU" | "General";
    status: "Available" | "Occupied" | "Under Maintenance";
    bedType: "A" | "B" | "C" ;
}

const BedSchema: Schema = new Schema({
   bedNumber: {type: String, required: true, unique: true},
   ward: {type: String, enum: ["Emergency", "ICU", "General"], required: true},
   status: {type: String, enum: ["Available", "Occupied", "Under Maintenance"], default: "Available"},
   bedType: {type: String, enum: ["A", "B", "C"], required: true},
}, {timestamps:true});

export default mongoose.model<IBed>("Bed", BedSchema);
