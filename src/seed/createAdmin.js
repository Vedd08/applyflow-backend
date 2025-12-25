import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admins = [
      {
        name: 'Platform Owner',
        email: 'admin@applyflow.com',
        password: 'Admin@123',
        role: 'admin'
      },
      {
        name: 'Operations Admin',
        email: 'ops@applyflow.com',
        password: 'Ops@123',
        role: 'admin'
      }
    ];

    for (const admin of admins) {
      const exists = await User.findOne({ email: admin.email });
      if (!exists) {
        await User.create(admin);
        console.log(`Admin created: ${admin.email}`);
      } else {
        console.log(`Admin already exists: ${admin.email}`);
      }
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
