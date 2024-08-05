import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
      },
})

export default mongoose.model("Student",studentSchema);