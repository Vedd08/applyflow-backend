import User from '../models/User.js';

/* =========================
   GET RECRUITER PROFILE
========================= */
export const getRecruiterProfile = async (req, res) => {
  const recruiter = await User.findById(req.user._id).select('companyProfile name email');

  res.json(recruiter);
};

/* =========================
   UPDATE RECRUITER PROFILE
========================= */
export const updateRecruiterProfile = async (req, res) => {
  const recruiter = await User.findById(req.user._id);

  recruiter.companyProfile = {
    ...recruiter.companyProfile,
    ...req.body
  };

  await recruiter.save();

  res.json({ message: 'Company profile updated successfully' });
};
