import express from 'express';
import {
  createJob,
  getApprovedJobs,
  getJobById,
  getMyJobs,
  deleteJob
} from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.post(
  '/',
  protect,
  authorizeRoles('recruiter'),
  createJob
);

/* IMPORTANT: before :id */
router.get(
  '/my',
  protect,
  authorizeRoles('recruiter'),
  getMyJobs
);

router.get('/approved', getApprovedJobs);

router.get('/:id', getJobById);

router.delete(
  '/:id',
  protect,
  authorizeRoles('recruiter'),
  deleteJob
);


export default router;
