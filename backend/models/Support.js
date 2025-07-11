import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['parent', 'provider'] },
  subject: String,
  message: String,
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  response: String,
  createdAt: { type: Date, default: Date.now },
  respondedAt: Date
});

export default mongoose.model('Support', supportSchema);
