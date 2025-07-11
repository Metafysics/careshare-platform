import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dates: [String], // Array van datums, bv ["2025-07-15", "2025-07-16"]
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
