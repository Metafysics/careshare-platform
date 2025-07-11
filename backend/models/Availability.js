import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String, // 'YYYY-MM-DD'
  pricePerDay: Number,
  status: { type: String, enum: ['open', 'reserved', 'booked'], default: 'open' }
});

export default mongoose.model('Availability', availabilitySchema);
