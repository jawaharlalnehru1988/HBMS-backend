import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'docker', 'staff'], default: 'staff'},
}, {timestamps:true});


export default mongoose.model("User", UserSchema);