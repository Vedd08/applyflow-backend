import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import adminRoutes from './routes/admin.routes.js';
import applicationRoutes from './routes/application.routes.js';
import recruiterRoutes from './routes/recruiter.routes.js';

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://applyflowweb.netlify.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recruiter', recruiterRoutes);

/* ================= STATIC FILES ================= */
app.use('/uploads', express.static(path.resolve('uploads')));

/* ================= HEALTH CHECK ================= */
app.get('/', (req, res) => {
  res.send('ApplyFlow API is running');
});

export default app;