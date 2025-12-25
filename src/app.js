import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import adminRoutes from './routes/admin.routes.js';
import applicationRoutes from './routes/application.routes.js';
import recruiterRoutes from './routes/recruiter.routes.js';
import path from 'path';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api/recruiter', recruiterRoutes);

app.get('/', (req, res) => {
  res.send('ApplyFlow API is running');
});

export default app;
