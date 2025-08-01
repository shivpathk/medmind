import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // encrypted later
  role: { type: String, enum: ['admin', 'doctor'], default: 'doctor' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

