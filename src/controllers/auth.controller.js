import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // 🔒 BLOCK ADMIN REGISTRATION
  if (role === 'admin') {
    return res.status(403).json({
      message: 'Admin registration is not allowed'
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: 'Email already registered'
    });
  }

  await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({
    message: 'Registration successful'
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      message: 'Account deactivated by admin'
    });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role
    }
  });
};
