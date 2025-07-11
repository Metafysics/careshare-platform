import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['parent', 'provider', 'admin'], default: 'parent' },
  lastLogin: Date,
  address: String,
  phone: String,
  children: [{
    name: String,
    ageInMonths: Number,
    notes: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
