import express from 'express';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import Availability from '../models/Availability.js';
import sendMail from '../utils/sendMail.js'; // Zorg dat je een sendMail functie hebt

const router = express.Router();

// POST bevestig betaling
router.post('/confirm/:paymentId', async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const payment = await Payment.findById(paymentId);

    if (!payment || payment.status === 'paid') {
      return res.status(400).json({ error: 'Ongeldige of reeds verwerkte betaling' });
    }

    payment.status = 'paid';
    payment.paidAt = new Date();
    await payment.save();

    const booking = await Booking.findById(payment.bookingId);
    booking.status = 'confirmed';
    await booking.save();

    // Markeer geboekte datums als geboekt
    await Availability.updateMany(
      { providerId: booking.providerId, date: { $in: booking.dates } },
      { $set: { status: 'booked' } }
    );

    // Verstuur e-mails
    await sendMail(booking.userId, `Je boeking is bevestigd voor ${booking.dates.length} dag(en).`);
    await sendMail(booking.providerId, `Nieuwe boeking ontvangen voor ${booking.dates.length} dag(en).`);

    res.status(200).json({ message: 'Betaling bevestigd, boeking voltooid' });
  } catch (err) {
    res.status(500).json({ error: 'Fout bij betalingsverwerking' });
  }
});

export default router;
