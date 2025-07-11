import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// GET notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen notificaties' });
  }
});

// PATCH mark notification as read
router.patch('/:id/mark-read', async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij bijwerken notificatie' });
  }
});

export default router;
