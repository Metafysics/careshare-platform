import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  status: { type: String, enum: ['unpaid', 'paid', 'failed'], default: 'unpaid' },
  createdAt: { type: Date, default: Date.now },
  paidAt: Date
});

export default mongoose.model('Payment', paymentSchema);
