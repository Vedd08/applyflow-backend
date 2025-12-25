import Job from '../models/Job.js';
import Application from '../models/Application.js';

/* ================= CREATE JOB ================= */
export const createJob = async (req, res) => {
  console.log('BODY:', req.body);
console.log('USER:', req.user);

  try {
    const job = await Job.create({
      title: req.body.title,
      companyName: req.body.companyName,
      location: req.body.location,
      type: req.body.type,
      description: req.body.description,
      postedBy: req.user._id,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Job submitted for approval',
      job
    });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

/* ================= GET MY JOBS (RECRUITER) ================= */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user._id
    })
      .sort({ createdAt: -1 })
      .lean();

    const jobIds = jobs.map(job => job._id);

    const applications = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      { $group: { _id: '$jobId', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    applications.forEach(a => {
      countMap[a._id.toString()] = a.count;
    });

    const jobsWithCounts = jobs.map(job => ({
      ...job,
      applicantsCount: countMap[job._id.toString()] || 0
    }));

    res.json(jobsWithCounts);
  } catch (error) {
    console.error('Get My Jobs Error:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};


/* ================= GET APPROVED JOBS ================= */
export const getApprovedJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'approved' })
    .sort({ createdAt: -1 });

  res.json(jobs);
};

/* ================= GET JOB BY ID ================= */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!job || job.status !== 'approved') {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.json(job);
  } catch (error) {
    console.error('Get Job By ID Error:', error);
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

/* ================= Delete  ================= */

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (!job.postedBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

