import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  company: String,
  position: String,
  type: String,
  location: String,
  skills: [String],
  experience: String,
  salary: String
});

export default mongoose.model('Jobs', JobSchema);