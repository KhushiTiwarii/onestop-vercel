import mongoose from "mongoose";

const recruitorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["recruitor"],
        default: "recruitor",
    },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

export default mongoose.model("Recruitor", recruitorSchema);
