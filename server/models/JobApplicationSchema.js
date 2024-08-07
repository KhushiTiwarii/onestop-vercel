// server/models/JobApplicationSchema.js

import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});

export default mongoose.model('JobApplication', JobApplicationSchema);
