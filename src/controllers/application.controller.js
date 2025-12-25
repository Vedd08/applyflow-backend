import Application from '../models/Application.js';
import Job from '../models/Job.js';

/* =========================
   APPLY TO JOB (HARDENED)
========================= */
export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job || job.status !== 'approved') {
      return res.status(404).json({
        message: 'Job not available'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Resume PDF is required'
      });
    }

    const application = await Application.create({
      jobId: job._id,
      studentId: req.user._id,
      recruiterId: job.postedBy._id || job.postedBy,
      resumeUrl: req.file.path,
      status: 'applied'
    });


    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'You have already applied to this job'
      });
    }

    res.status(500).json({
      message: 'Something went wrong. Please try again.'
    });
  }
};

/* =========================
   CHECK IF APPLIED
========================= */
export const checkIfApplied = async (req, res) => {
  const existing = await Application.findOne({
    jobId: req.params.jobId,
    studentId: req.user._id
  });

  res.json({ applied: !!existing });
};

/* =========================
   RECRUITER VIEW
========================= */
export const getApplicantsForRecruiter = async (req, res) => {
  console.log('Recruiter ID:', req.user._id);

  const applications = await Application.find({
    recruiterId: req.user._id
  })
    .populate('studentId', 'name email')
    .populate('jobId', 'title');

  res.json(applications);
};

/* =========================
   UPDATE STATUS
========================= */
export const updateApplicationStatus = async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  if (!application.recruiterId.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  application.status = req.body.status;
  await application.save();

  res.json({ message: 'Status updated' });
};

/* =========================
   STUDENT VIEW
========================= */
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    studentId: req.user._id
  })
    .populate('jobId', 'title companyName location')
    .sort({ createdAt: -1 });

  res.json(applications);
};
