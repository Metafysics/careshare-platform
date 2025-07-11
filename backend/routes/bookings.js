import express from 'express';
import Booking from '../models/Booking.js';
import Availability from '../models/Availability.js';
import Payment from '../models/Payment.js';

const router = express.Router();

// POST create booking for multiple dates
router.post('/', async (req, res) => {
  try {
    const { userId, providerId, selectedDates } = req.body;

    if (!userId || !providerId || !selectedDates || selectedDates.length === 0) {
      return res.status(400).json({ error: 'Verplichte gegevens ontbreken' });
    }

    const availabilities = await Availability.find({
      providerId,
      date: { $in: selectedDates },
      status: 'open'
    });

    if (availabilities.length !== selectedDates.length) {
      return res.status(409).json({ error: 'Sommige datums zijn niet meer beschikbaar' });
    }

    const totalAmount = availabilities.reduce((sum, a) => sum + a.pricePerDay, 0);

    const booking = await Booking.create({
      userId,
      providerId,
      dates: selectedDates,
      status: 'pending',
      totalAmount,
      createdAt: new Date()
    });

    await Availability.updateMany({ _id: { $in: availabilities.map(a => a._id) } }, { $set: { status: 'reserved' } });

    const payment = await Payment.create({
      bookingId: booking._id,
      userId,
      amount: totalAmount,
      status: 'unpaid',
      createdAt: new Date()
    });

    res.status(201).json({ bookingId: booking._id, paymentId: payment._id, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Boeking mislukt' });
  }
});

export default router;
