import mongoose from 'mongoose';

const payoutSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  month: { type: String, required: true, index: true }, // Format 'YYYY-MM'
  paid: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

payoutSchema.index({ providerId: 1, month: 1 }, { unique: true });

export default mongoose.model('Payout', payoutSchema);
