import express from 'express';
import {
  getRecruiterProfile,
  updateRecruiterProfile
} from '../controllers/recruiter.controller.js';

import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.get(
  '/profile',
  protect,
  authorizeRoles('recruiter'),
  getRecruiterProfile
);

router.put(
  '/profile',
  protect,
  authorizeRoles('recruiter'),
  updateRecruiterProfile
);

export default router;
