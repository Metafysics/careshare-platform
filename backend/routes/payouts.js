import express from 'express';
import Payout from '../models/Payout.js';

const router = express.Router();

// GET uitbetalingen overzicht
router.get('/', async (req, res) => {
  try {
    const payouts = await Payout.find().sort({ month: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen uitbetalingen' });
  }
});

// POST toggle uitbetaling (betaald/niet betaald)
router.post('/toggle', async (req, res) => {
  try {
    const { providerId, month, paid } = req.body;
    const payout = await Payout.findOneAndUpdate(
      { providerId, month },
      { paid, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(payout);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij updaten uitbetaling' });
  }
});

export default router;
