import express from 'express';
import {
  applyToJob,
  getApplicantsForRecruiter,
  updateApplicationStatus,
  getMyApplications,
  checkIfApplied
} from '../controllers/application.controller.js';


import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { uploadResume } from '../middleware/upload.middleware.js';

const router = express.Router();

/* =========================
   STUDENT ROUTES
========================= */

// Apply to a job (PDF resume)
router.post(
  '/:jobId/apply',
  protect,
  authorizeRoles('student'),
  uploadResume.single('resume'),
  applyToJob
);

// View my applications
router.get(
  '/my',
  protect,
  authorizeRoles('student'),
  getMyApplications
);

/* =========================
   RECRUITER ROUTES
========================= */

// View all applicants for recruiter’s jobs
router.get(
  '/recruiter',
  protect,
  authorizeRoles('recruiter'),
  getApplicantsForRecruiter
);

// Update application status
router.patch(
  '/:id/status',
  protect,
  authorizeRoles('recruiter'),
  updateApplicationStatus
);

router.get(
  '/:jobId/check',
  protect,
  authorizeRoles('student'),
  checkIfApplied
);


export default router;
