import mongoose from 'mongoose';

const cmsSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  content: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CMS', cmsSchema);
