import mongoose, { Schema } from "mongoose";
export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'staff' | 'doctor';
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'staff', 'doctor'], default: 'staff'},
}, {timestamps:true});


export default mongoose.model<IUser>("User", UserSchema);