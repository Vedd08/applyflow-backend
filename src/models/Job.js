import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ['internship', 'part-time', 'full-time', 'remote'],
        message: 'Invalid job type'
      },
      required: true
    },
    location: { type: String, required: true },
    salary: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
