import express from 'express';
import {
  getPendingJobs,
  updateJobStatus,
  getAllUsers,
  toggleUserStatus
} from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.get(
  '/jobs/pending',
  protect,
  authorizeRoles('admin'),
  getPendingJobs
);

router.patch(
  '/jobs/:id/status',
  protect,
  authorizeRoles('admin'),
  updateJobStatus
);

router.get(
  '/users',
  protect,
  authorizeRoles('admin'),
  getAllUsers
);

router.patch(
  '/users/:id/toggle',
  protect,
  authorizeRoles('admin'),
  toggleUserStatus
);

export default router;
