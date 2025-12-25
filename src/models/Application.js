import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    resumeUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'hired'],
      default: 'applied'
    }
  },
  { timestamps: true }
);

// 🚫 APPLY ONLY ONCE PER JOB
applicationSchema.index(
  { jobId: 1, studentId: 1 },
  { unique: true }
);

export default mongoose.model('Application', applicationSchema);
