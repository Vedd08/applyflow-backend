import Job from '../models/Job.js';
import User from '../models/User.js';

/* =========================
   JOB MODERATION
========================= */

// Get all pending jobs
export const getPendingJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'pending' })
    .populate('postedBy', 'name email');

  res.json(jobs);
};

// Approve or reject job
export const updateJobStatus = async (req, res) => {
  const { status } = req.body;

  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  job.status = status;
  await job.save();

  res.json({ message: 'Job status updated' });
};

/* =========================
   USER MANAGEMENT
========================= */

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Activate / Deactivate user
export const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Prevent admin from disabling themselves
  if (user._id.equals(req.user._id)) {
    return res.status(400).json({
      message: 'Admin cannot deactivate self'
    });
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    message: `User ${user.isActive ? 'activated' : 'deactivated'}`
  });
};
