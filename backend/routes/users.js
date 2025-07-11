import express from 'express';
import User from '../models/User.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all parents (optioneel filter op rol)
router.get('/', verifyAdmin, async (req, res) => {
  const role = req.query.role || 'parent';
  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Serverfout bij ophalen gebruikers' });
  }
});

// POST clean inactive parents (GDPR)
router.post('/clean-inactive', verifyAdmin, async (req, res) => {
  try {
    const drieJaarGeleden = new Date();
    drieJaarGeleden.setFullYear(drieJaarGeleden.getFullYear() - 3);

    const ouders = await User.find({ role: 'parent', lastLogin: { $lt: drieJaarGeleden } });
    for (const ouder of ouders) {
      ouder.address = undefined;
      ouder.phone = undefined;
      ouder.children = undefined;
      ouder.notes = undefined;
      ouder.profile = undefined;
      ouder.updatedAt = new Date();
      await ouder.save();
    }

    res.json({ success: true, gewist: ouders.length });
  } catch (err) {
    res.status(500).json({ error: 'Fout bij GDPR-opruiming' });
  }
});

export default router;
